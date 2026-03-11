import express from "express";
import { convertToUserDTO } from "../models/UserSchema.mjs";
import { createUser } from "../controllers/registerController.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Missing name, email, password or all in body" });
  }

  try {
    const createdUser = await createUser(name, email, password);

    const dtoUser = convertToUserDTO(createdUser);

    res.status(201).json(dtoUser);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
