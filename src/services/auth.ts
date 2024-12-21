import { IUser } from "@/types/index";
import { IAuthResponse } from "@/types/interface";
import { userSchema } from "@/validationSchema/user";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from "src/config";
import { UserService } from ".";
import { NotFoundError } from "../errors";

export async function login(
  data: Pick<IUser, "username" | "password">,
): Promise<IAuthResponse> {
  const userData = userSchema.parse(data);

  const user = await UserService.getUserByUsername(userData.username);
  if (!user) throw new NotFoundError("Invalid credentials");
  const userPassword = await UserService.getUserById(user.id);

  const isValidPassword = await bcrypt.compare(
    userData.password,
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
