import { IUser } from "@/types/index";
import { UserModel } from "../models/user";
import { NotFoundError, UserExistsError } from "../errors";

export async function createUser(data: IUser) {
  const existingUserUsername = await UserModel.getUserByUsername(data.username);
  if (existingUserUsername) throw new UserExistsError("Username already taken");
  const existingUserEmail = await UserModel.getUserByEmail(data.email);
  if (existingUserEmail) throw new UserExistsError("email already in use");
  return await UserModel.createUser(data);
}

export async function updateUser(id: string, data: Partial<IUser>) {
  const existingUserUsername = await UserModel.getUserById(id);
  if (!existingUserUsername) throw new NotFoundError("User not found");
  return await UserModel.updateUser(id, data);
}

export async function getUserByEmail(email: string) {
  return await UserModel.getUserByEmail(email);
}

export async function getUserByUsername(username: string) {
  return await UserModel.getUserByUsername(username);
}

export async function getUserById(id: string) {
  return await UserModel.getUserById(id);
}
