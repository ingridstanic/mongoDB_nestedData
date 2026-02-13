import { Schema } from "mongoose";

export const gameSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true, minLength: 2 },
  played: { type: Boolean, required: true },
});
