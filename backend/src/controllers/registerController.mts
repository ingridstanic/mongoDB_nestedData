import bcrypt from "bcryptjs";
import { User } from "../models/UserSchema.mjs";

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const found = await User.findOne({ email: email });

  if (found) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  password = hash;

  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    games: [],
  };

  return await User.create(newUser);
};
