import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

const allowedOrigins = [
    "https://trackizer-production-f551.up.railway.app",
];

if (process.env.FRONTEND_ORIGIN) {
    allowedOrigins.push(process.env.FRONTEND_ORIGIN);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.options("*", cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// Versioned API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflow", workflowRouter);

// Unversioned aliases (for clients calling /auth, /users, etc.)
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/workflow", workflowRouter);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to subscription tracker API.</h1>")
});

// Health check for serverless routing verification
app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Error middleware should be registered last
app.use(errorMiddleware);

export default app;