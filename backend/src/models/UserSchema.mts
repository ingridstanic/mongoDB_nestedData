import { model, Schema } from "mongoose";
import { gameSchema } from "./GameSchema.mjs";

export const userSchema = new Schema({
  id: { type: Number, requried: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  games: [gameSchema],
});

export const User = model("user", userSchema);
