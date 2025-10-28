import { Router } from 'express';
// import { sendReminders } from '../controller/workflow.controller.js';

const workflowRouter = Router();

workflowRouter.post('/subscription/reminder', (req, res) => {
  // TODO: Integrate with the workflow trigger here
  res.json({ message: "To start workflow, integrate with workflow trigger logic here." });
});

export default workflowRouter;