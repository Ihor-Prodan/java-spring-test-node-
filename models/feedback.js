import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Campaign from './campaign.js';

const Feedback = sequelize.define('Feedback', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Feedback.belongsTo(Campaign);
Campaign.hasMany(Feedback);

export default Feedback;
