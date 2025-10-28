import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import validateObjectId from '../middlewares/validateObjectId.js';
import { getUser, getUsers, createUser } from '../controller/user.controller.js'
import adminOnly from '../middlewares/adminOnly.js';

const userRouter = Router();

userRouter.get("/", authorize, adminOnly, getUsers);

userRouter.get("/:id", authorize, validateObjectId, getUser);

userRouter.post("/", createUser);

userRouter.put("/:id", validateObjectId, (req, res) => res.json({ title: "Update a user details" }));

userRouter.delete("/:id", validateObjectId, (req, res) => res.json({ title: "Delete a user" }));

export default userRouter;
