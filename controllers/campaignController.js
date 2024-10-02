import sequelize from '../db.js';
import Answer from '../models/answer.js';
import Campaign from '../models/campaign.js';
import Feedback from '../models/feedback.js';
import Question from '../models/question.js';

export const createCampaign = async (req, res) => {
  const { name, description, questions } = req.body;
  const transact = await sequelize.transaction();

  try {
    const newCampaign = await Campaign.create({ name, description }, { transaction: transact });

    for (const question of questions) {
      await Question.create({
        text: question.text,
        type: question.type,
        options: question.options || null,
        CampaignId: newCampaign.id,
      }, { transaction: transact });
    }

    await transact.commit();

    res.status(201).json(newCampaign);
  } catch (error) {
    await transact.rollback();

    console.error('Failed to create campaign:', error);
    res.status(500).json({ message: 'Failed to create campaign' });
  }
};

export const getCampaignSummary = async (req, res) => {
  const { id: campaignId } = req.params;

  try {
    const campaign = await Campaign.findByPk(campaignId, {
      include: [
        { model: Question },
        { model: Feedback, include: [Answer] },
      ],
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const feedbacks = campaign.Feedbacks || [];

    const summary = {
      totalFeedbacks: feedbacks.length,
      questionsSummary: campaign.Questions.map((question) => {
        const questionSummary = { name: question.text, type: question.type };

        if (question.type === 'RATING') {
          const ratings = feedbacks
            .map((feedback) => feedback.Answers.find((ans) => ans.QuestionId === question.id)?.ratingValue)
            .filter((value) => value !== undefined);

          const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0;
          questionSummary.averageRating = averageRating;

        } else if (question.type === 'CHOICE') {
          const optionCounts = {};

          question.options.forEach((option) => {
            optionCounts[option] = 0;
          });

          feedbacks.forEach((feedback) => {
            const selectedOptions = feedback.Answers.find((ans) => ans.QuestionId === question.id)?.selectedOptions || [];

            selectedOptions.forEach((option) => {
              optionCounts[option] = (optionCounts[option] || 0) + 1;
            });
          });

          questionSummary.optionCounts = optionCounts;
        }

        return questionSummary;
      }),
    };

    res.json(summary);
  } catch (error) {

    console.error('Error in getCampaignSummary:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
