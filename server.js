import app from './app.js';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import { startReminderScheduler } from './utils/scheduler.js';

const startServer = async () => {
  try {
    await connectToDatabase();

    // Start the reminder scheduler only for the long-running server
    startReminderScheduler();

    app.listen(PORT, () => {
      console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
