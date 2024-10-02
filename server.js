import express from 'express';
import bodyParser from 'body-parser';
import campaignRoutes from './routes/campaignRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import sequelize from './db.js';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use('/api/campaigns', campaignRoutes);
app.use('/api/feedbacks', feedbackRoutes);

const runServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

runServer();
