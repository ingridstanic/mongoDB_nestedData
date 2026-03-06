import type { GameDTO } from "../models/GameDTO.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";
import { convertToUserDTO, User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const databaseUsers = await User.find();

  return databaseUsers.map((user) => convertToUserDTO(user));
};

export const createUser = async (name: string, email: string) => {
  const newUser = {
    id: Date.now(),
    name,
    email,
    games: [],
  };

  const createdUser = await User.create(newUser);

  return convertToUserDTO(createdUser);
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
