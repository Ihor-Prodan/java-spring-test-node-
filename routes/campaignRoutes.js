import express from 'express';
import { createCampaign, getCampaignSummary } from '../controllers/campaignController.js';

const router = express.Router();

router.post('/', createCampaign);
router.get('/:id/summary', getCampaignSummary);

export default router;