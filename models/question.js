import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Campaign from './campaign.js';

const Question = sequelize.define('Question', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('RATING', 'CHOICE'),
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

Question.belongsTo(Campaign);
Campaign.hasMany(Question);

export default Question;

