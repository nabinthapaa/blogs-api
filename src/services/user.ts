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
  const existingUser = await UserModel.getUserById(id);
  if (!existingUser) throw new NotFoundError("User not found");
  if (data?.email) {
    const existingUserEmail = await UserModel.getUserByEmail(data.email);
    if (id !== existingUserEmail?.id && existingUserEmail)
      throw new UserExistsError("Email already in use");
  }
  if (data?.username) {
    const existingUserUsername = await UserModel.getUserByUsername(
      data?.username,
    );
    if (existingUserUsername && id !== existingUserUsername?.id)
      throw new UserExistsError("Username already taken");
  }
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
