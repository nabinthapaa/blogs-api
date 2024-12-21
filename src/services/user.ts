import { IUser } from "@/types/index";
import { userSchema } from "@/validationSchema/user";
import { UserModel } from "src/models/user";
import { NotFoundError, UserExistsError } from "../errors";

export async function createUser(data: IUser) {
  const userData = userSchema.parse(data);
  const existingUserUsername = await UserModel.getUserByUsername(data.username);
  if (existingUserUsername) throw new UserExistsError("Username already taken");
  const existingUserEmail = await UserModel.getUserByEmail(data.email);
  if (existingUserEmail) throw new UserExistsError("email already in use");
  return await UserModel.createUser(userData);
}

export async function updateUser(id: string, data: Partial<IUser>) {
  const userData = userSchema.partial().parse(data);
  const existingUserUsername = await UserModel.getUserById(id);
  if (!existingUserUsername) throw new NotFoundError("User not found");
  return await UserModel.updateUser(id, userData);
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
