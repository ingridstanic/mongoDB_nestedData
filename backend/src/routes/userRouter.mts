import express from "express";
import type { UserDTO } from "../models/UserDTO.mjs";
import { addUsersGame, getUsers } from "../controllers/userController.mjs";

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

userRouter.patch("/addgame/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || title === "") {
      res
        .status(400)
        .json({ message: "gameTitle is missing in body or is empty" });
      return;
    }

    const success = await addUsersGame(id, title);

    if (success) {
      res.status(201).json({ message: "Game added to user id: " + id });
    } else {
      res.status(500).json({ message: "Internal error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
