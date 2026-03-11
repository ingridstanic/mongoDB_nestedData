import bcrypt from "bcryptjs";
import { User } from "../models/UserSchema.mjs";

export const login = async (email: string, password: string) => {
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    throw Error("User with email: " + email + " does not exist in database");
  }

  const success = await bcrypt.compare(password, foundUser.password);

  if (success) {
    return foundUser;
  } else {
    throw Error("Invalid credentials");
  }
};
