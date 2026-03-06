import type { GameDTO } from "../models/GameDTO.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const databaseUsers = await User.find();

  const dtos: UserDTO[] = databaseUsers.map((user) => {
    console.log(user.id, typeof user.id);
    return {
      id: user.id,
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
