import type { GameDTO } from "../models/GameDTO.mjs";
import { convertToUserDTO, User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const databaseUsers = await User.find();

  return databaseUsers.map((user) => convertToUserDTO(user));
};

export const addUsersGame = async (id: string, title: string) => {
  const foundUser = await User.findOne({ id: +id });

  if (!foundUser) return false;

  const game = {
    id: Date.now(),
    title,
    played: false,
  } satisfies GameDTO;
  // console.log(game);

  foundUser.games.push(game);

  await foundUser.save();

  return true;
};
