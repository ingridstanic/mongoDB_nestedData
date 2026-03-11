import express from "express";
import jwt from "jsonwebtoken";
import { convertToUserDTO } from "../models/UserSchema.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const loggedInUser = await login(email, password);

    const token = jwt.sign(
      convertToUserDTO(loggedInUser),
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    res.cookie("login", token, {
      httpOnly: true,
      expires,
    });

    res
      .status(200)
      .json({ message: "User: " + loggedInUser.name + " is now logged in." });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
