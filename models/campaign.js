import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Campaign = sequelize.define('Campaign', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Campaign;
