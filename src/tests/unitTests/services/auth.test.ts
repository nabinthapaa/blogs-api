import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from "../../../config";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UserExistsError } from "../../../errors/UserExistsError";
import { login, register } from "../../../services/auth";
import * as UserService from "../../../services/user";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../../../models/user.ts", () => {});
jest.mock("../../../services/user.ts");

describe("Auth Service => login", () => {
  const mockUser = {
    id: 1,
    username: "username",
    password: "password",
    email: "email",
    fullName: "full name",
  };

  const mockAccessToken = "accessToken";
  const mockRefreshToken = "refreshToken";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw not found error when user is not found using username", async () => {
    (UserService.getUserByUsername as jest.Mock).mockResolvedValue(null);
    await expect(login({ username: "user", password: "pass" })).rejects.toThrow(
      NotFoundError,
    );
    expect(UserService.getUserByUsername).toHaveBeenCalledTimes(1);
    expect(UserService.getUserByUsername).toHaveBeenCalledWith("user");

    expect(UserService.getUserById).not.toHaveBeenCalled();
    expect(compare).not.toHaveBeenCalled();
    expect(sign).not.toHaveBeenCalled();
  });

  it("Should throw not found error when password is incorrect", async () => {
    (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (UserService.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(
      login({ username: "username", password: "pass" }),
    ).rejects.toThrow(NotFoundError);

    expect(UserService.getUserByUsername).toHaveBeenCalledWith("username");
    expect(UserService.getUserByUsername).toHaveBeenCalledTimes(1);

    expect(UserService.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(UserService.getUserById).toHaveBeenCalledTimes(1);

    expect(compare).toHaveBeenCalledWith("pass", mockUser.password);
    expect(compare).toHaveBeenCalledTimes(1);

    expect(sign).not.toHaveBeenCalled();
  });

  it("Should successfully login and return access and refresh token", async () => {
    (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (UserService.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);
    (sign as jest.Mock).mockImplementation((_, __, options) => {
      return options?.expiresIn === config.jwt.accessTokenExpiryMS
        ? mockAccessToken
        : mockRefreshToken;
    });

    await expect(
      login({ username: "username", password: "password" }),
    ).resolves.toEqual({
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
      user: mockUser,
    });

    expect(UserService.getUserByUsername).toHaveBeenCalledWith("username");
    expect(UserService.getUserByUsername).toHaveBeenCalledTimes(1);

    expect(UserService.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(UserService.getUserById).toHaveBeenCalledTimes(1);

    expect(compare).toHaveBeenCalledWith("password", mockUser.password);
    expect(compare).toHaveBeenCalledTimes(1);

    expect(sign).toHaveBeenCalledTimes(2);
    expect(sign).toHaveLastReturnedWith(mockRefreshToken);
  });
});

describe("Auth Service => register", () => {
  const mockUser = {
    id: 1,
    username: "username",
    password: "password",
    email: "email",
    fullName: "full name",
  };

  const mockAccessToken = "accessToken";
  const mockRefreshToken = "refreshToken";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw use exists error when username is taken", async () => {
    (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    await expect(
      register({
        username: "username",
        password: "pass",
        email: "email@test.com",
        fullName: "full name",
      }),
    ).rejects.toThrow(UserExistsError);

    expect(UserService.getUserByUsername).toHaveBeenCalledTimes(1);
    expect(UserService.getUserByUsername).toHaveBeenCalledWith("username");

    expect(UserService.getUserByEmail).not.toHaveBeenCalled();
    expect(hash).not.toHaveBeenCalled();
    expect(sign).not.toHaveBeenCalled();
  });

  it("Should throw use exists error when email is already in use", async () => {
    (UserService.getUserByUsername as jest.Mock).mockResolvedValue(null);
    (UserService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    await expect(
      register({
        username: "username",
        password: "pass",
        email: "email@test.com",
        fullName: "full name",
      }),
    ).rejects.toThrow(UserExistsError);

    expect(UserService.getUserByUsername).toHaveBeenCalledTimes(1);
    expect(UserService.getUserByUsername).toHaveBeenCalledWith("username");

    expect(UserService.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(UserService.getUserByEmail).toHaveBeenCalledWith("email@test.com");

    expect(hash).not.toHaveBeenCalled();
    expect(sign).not.toHaveBeenCalled();
  });

  it("Should successfully create user", async () => {
    (UserService.getUserByUsername as jest.Mock).mockResolvedValue(null);
    (UserService.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (UserService.createUser as jest.Mock).mockResolvedValue(mockUser);
    (hash as jest.Mock).mockResolvedValue("hashedpassword");
    (sign as jest.Mock).mockImplementation((_, __, options) => {
      return options?.expiresIn === config.jwt.accessTokenExpiryMS
        ? mockAccessToken
        : mockRefreshToken;
    });

    await expect(
      register({
        username: "username",
        password: "password",
        email: "email@test.com",
        fullName: "full name",
      }),
    ).resolves.toEqual({
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
      user: mockUser,
    });

    expect(UserService.getUserByUsername).toHaveBeenCalledWith("username");
    expect(UserService.getUserByUsername).toHaveBeenCalledTimes(1);

    expect(UserService.createUser).toHaveBeenCalledTimes(1);

    expect(hash).toHaveBeenCalledWith("password", 10);
    expect(hash).toHaveBeenCalledTimes(1);

    expect(sign).toHaveBeenCalledTimes(2);
    expect(sign).toHaveLastReturnedWith(mockRefreshToken);
  });
});
