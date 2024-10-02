import Answer from '../models/answer.js';
import Feedback from '../models/feedback.js';

export const submitFeedback = async (req, res) => {
  const { campaignId, userId, answers } = req.body;

  try {
    const feedback = await Feedback.create({ userId, CampaignId: campaignId });

    const answerPromises = answers.map((answer) => {
      return Answer.create({
        ratingValue: answer.ratingValue || null,
        selectedOptions: answer.selectedOptions || null,
        FeedbackId: feedback.id,
        QuestionId: answer.questionId,
      });
    });

    await Promise.all(answerPromises);

    res.status(201).json(feedback);
  } catch (error) {

    console.error('Error in submitFeedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
