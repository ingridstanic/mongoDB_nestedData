import { model, Schema, type InferSchemaType } from "mongoose";
import { gameSchema } from "./GameSchema.mjs";
import type { UserDTO } from "./UserDTO.mjs";
import type { GameDTO } from "./GameDTO.mjs";

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  games: [gameSchema],
});

export const User = model("user", userSchema);

export type UserFromDB = InferSchemaType<typeof userSchema>;

export const convertToUserDTO = (DBUser: UserFromDB) => {
  return {
    id: DBUser.id,
    name: DBUser.name,
    games: DBUser.games.map((game) => {
      return {
        id: game.id,
        title: game.title,
        played: game.played,
      } satisfies GameDTO;
    }),
  } satisfies UserDTO;
};
