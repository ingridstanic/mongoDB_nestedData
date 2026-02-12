import { Schema } from "mongoose";

export const gameSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, requried: true, minLength: 2 },
  played: { type: Boolean, required: true },
});
