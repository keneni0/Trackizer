import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/adminOnly.js";
import { createSubscription, getSubscriptions, getAllSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription, cancelSubscription, getUpcomingRenewals } from "../controller/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.post("/", authorize, createSubscription);
// This allows GET /api/v1/subscriptions and returns the current user's subscriptions
subscriptionRouter.get("/", authorize, getSubscriptions);
subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);
subscriptionRouter.get("/all", authorize, adminOnly, getAllSubscriptions);
subscriptionRouter.get("/user/:userId", authorize, getSubscriptions);
subscriptionRouter.get("/:id", authorize, getSubscriptionById);
subscriptionRouter.put("/:id", authorize, updateSubscription);
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;