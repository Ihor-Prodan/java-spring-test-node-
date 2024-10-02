import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Feedback from './feedback.js';
import Question from './question.js';

const Answer = sequelize.define('Answer', {
  ratingValue: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  selectedOptions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

Answer.belongsTo(Feedback);
Feedback.hasMany(Answer);

Answer.belongsTo(Question);
Question.hasMany(Answer);

export default Answer;
