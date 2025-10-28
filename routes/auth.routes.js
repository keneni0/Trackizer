import { Router } from "express";
import { signUp, signIn, signOut, getCurrentUser } from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/blacklist.middleware.js";
import authorize from "../middlewares/auth.middleware.js";


const authRouter = Router();

// GET /api/v1/auth - Show available auth endpoints OR ROUTES
authRouter.get("/", (req, res) => res.json({ 
    message: "Auth endpoints available",
    endpoints: ["/sign-up", "/sign-in", "/sign-out", "/me"]
}));


//path api/v1/auth/sign-up
authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.get("/me", authorize, getCurrentUser);

authRouter.post("/sign-out", signOut);
authRouter.post("/signout", signOut); // optional alias
authRouter.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

export default authRouter;