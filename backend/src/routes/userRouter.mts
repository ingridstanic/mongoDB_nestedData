import express from "express";
import type { UserDTO } from "../models/UserDTO.mjs";
import { createUser, getUsers } from "../controllers/userController.mjs";

export const userRouter = express.Router();

userRouter.get("/", async (_, res) => {
  try {
    const users: UserDTO[] = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || name === "") {
      res
        .status(400)
        .json({ message: "Body does not contain name or is empty" });
      return;
    }
    const finalemail = email || "No email";

    const newUser = await createUser(name, finalemail);
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
