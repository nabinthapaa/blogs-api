import { IUser } from "@/types/index";
import { IAuthResponse } from "@/types/interface";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from "src/config";
import { UserService } from ".";
import { NotFoundError, UserExistsError } from "../errors";

export async function login(
  data: Pick<IUser, "username" | "password">,
): Promise<IAuthResponse> {
  const user = await UserService.getUserByUsername(data.username);
  if (!user) throw new NotFoundError("Invalid credentials");
  const userPassword = await UserService.getUserById(user.id);

  const isValidPassword = await bcrypt.compare(
    data.password,
    userPassword.password,
  );
  if (!isValidPassword) throw new NotFoundError("Invalid credentials");

  const accessToken = sign(user, config.jwt.secret, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(user, config.jwt.secret, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
    user,
  };
}

export async function register(data: IUser): Promise<IAuthResponse> {
  const user = await UserService.getUserByUsername(data.username);
  if (user) throw new UserExistsError("Username already taken");

  const userWithEmail = await UserService.getUserByEmail(data.email);
  if (userWithEmail) throw new UserExistsError("Email already in use");

  const hashPassword = await bcrypt.hash(data.password, 10);

  const newUser = await UserService.createUser({
    ...data,
    password: hashPassword,
  });

  const accessToken = sign(newUser, config.jwt.secret, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(newUser, config.jwt.secret, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
    user: newUser,
  };
}
