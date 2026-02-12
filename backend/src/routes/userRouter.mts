import express from "express";
import type { UserDTO } from "../models/UserDTO.mjs";
import { getUsers } from "../controllers/userController.mjs";

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users: UserDTO[] = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
