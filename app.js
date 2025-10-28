import express from "express";

import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";
import { startReminderScheduler } from "./utils/scheduler.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);


app.use("/api/v1/auth", authRouter);   
app.use("/api/v1/users", userRouter);   
app.use("/api/v1/subscriptions", subscriptionRouter);   
app.use("/api/v1/workflow", workflowRouter);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to subscription tracker API.</h1>")
});

// Ensure DB connection is established BEFORE starting the server
const startServer = async () => {
    try {
        await connectToDatabase();
        
        // Start the reminder scheduler
        startReminderScheduler();
        
        app.listen(PORT, () => {
            console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

// Error middleware should be registered last
app.use(errorMiddleware);

export default app;