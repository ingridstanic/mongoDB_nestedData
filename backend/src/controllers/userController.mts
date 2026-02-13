import type { GameDTO } from "../models/GameDTO.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const databaseUsers = await User.find();

  const dtos: UserDTO[] = databaseUsers.map((user) => {
    return {
      id: +user.id,
      name: user.name,
      games: user.games.map((game) => {
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

export const createUser = async (name: string, email: string) => {
  const newUser = {
    id: Date.now(),
    name,
    email,
    games: [],
  };

  const createdUser = await User.create(newUser);

  return {
    id: +createdUser.id,
    name: createdUser.name,
    games: createdUser.games.map((game) => {
      return {
        id: game.id,
        title: game.title,
        played: game.played,
      } satisfies GameDTO;
    }),
  } satisfies UserDTO;
};
