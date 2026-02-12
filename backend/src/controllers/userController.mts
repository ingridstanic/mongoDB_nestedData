import type { GameDTO } from "../models/GameDTO.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const databaseUsers = await User.find();

  const dtos: UserDTO[] = databaseUsers.map((user) => {
    return {
      id: user.id,
      name: user.name,
      game: user.games.map((game) => {
        return {
          id: game.id,
          title: game.title,
          played: game.played,
        } satisfies GameDTO;
      }),
    } satisfies UserDTO;
  });

  return dtos;
};
