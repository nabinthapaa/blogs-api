import { NotFoundError, UserExistsError } from "@/errors/index";
import { UserModel } from "@/models/user";
import { UserService } from "@/services/index";
import { createUser } from "@/services/user";
import { PassThrough } from "stream";

jest.mock("@/database/schemas", () => {});
jest.mock("@/models/user.ts");

const mockUser = {
  id: "1",
  username: "username",
  email: "email",
  password: "passoword",
  fullName: "full name",
};

describe("User Service => create user", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should throw user exists error when user is found with username", async () => {
    (UserModel.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    await expect(createUser(mockUser)).rejects.toThrow(UserExistsError);

    expect(UserModel.getUserByUsername).toHaveBeenCalledWith("username");
    expect(UserModel.getUserByEmail).not.toHaveBeenCalled();
    expect(UserModel.createUser).not.toHaveBeenCalled();
  });

  it("Should throw user exists error when user is found with email", async () => {
    (UserModel.getUserByUsername as jest.Mock).mockResolvedValue(null);
    (UserModel.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    await expect(createUser(mockUser)).rejects.toThrow(UserExistsError);

    expect(UserModel.getUserByUsername).toHaveBeenCalledWith(mockUser.username);
    expect(UserModel.createUser).not.toHaveBeenCalledTimes(1);

    expect(UserModel.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(UserModel.getUserByEmail).toHaveBeenCalledTimes(1);

    expect(UserModel.createUser).not.toHaveBeenCalled();
  });

  it("Should create user", async () => {
    (UserModel.getUserByUsername as jest.Mock).mockResolvedValue(null);
    (UserModel.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (UserModel.createUser as jest.Mock).mockResolvedValue(mockUser);
    await expect(createUser(mockUser)).resolves.toEqual(mockUser);

    expect(UserModel.getUserByUsername).toHaveBeenCalledWith(mockUser.username);
    expect(UserModel.getUserByUsername).toHaveBeenCalledTimes(1);

    expect(UserModel.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(UserModel.getUserByEmail).toHaveBeenCalledTimes(1);

    expect(UserModel.createUser).toHaveBeenCalledWith(mockUser);
    expect(UserModel.createUser).toHaveBeenCalledTimes(1);
  });
});

describe("User service => getUserByEmail", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should return null when user is not found", async () => {
    (UserModel.getUserByEmail as jest.Mock).mockResolvedValue(null);
    await expect(UserModel.getUserByEmail(mockUser.email)).resolves.toBeNull();

    expect(UserModel.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(UserModel.getUserByEmail).toHaveBeenCalledTimes(1);
  });

  it("Should return user when user is found", async () => {
    (UserModel.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    await expect(UserModel.getUserByEmail(mockUser.email)).resolves.toEqual(
      mockUser,
    );

    expect(UserModel.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(UserModel.getUserByEmail).toHaveBeenCalledTimes(1);
  });
});

describe("User service => updateUser", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should throw not found error when user with id is not found", async () => {
    (UserModel.getUserById as jest.Mock).mockResolvedValue(null);
    await expect(
      UserService.updateUser(mockUser.id, { password: "updatedPassword" }),
    ).rejects.toThrow(NotFoundError);

    expect(UserModel.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(UserModel.getUserById).toHaveBeenCalledTimes(1);

    expect(UserModel.updateUser).not.toHaveBeenCalled();
  });

  it("Should update user when found", async () => {
    (UserModel.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (UserModel.updateUser as jest.Mock).mockResolvedValue({
      ...mockUser,
      password: "updatedPassword",
    });
    await expect(
      UserService.updateUser(mockUser.id, { password: "updatedPassword" }),
    ).resolves.toEqual({
      ...mockUser,
      password: "updatedPassword",
    });

    expect(UserModel.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(UserModel.getUserById).toHaveBeenCalledTimes(1);

    expect(UserModel.updateUser).toHaveBeenCalledWith(mockUser.id, {
      password: "updatedPassword",
    });
    expect(UserModel.updateUser).toHaveBeenCalledTimes(1);
  });
});

describe("User service => getUserByUsername", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should return null when user is not found with username", async () => {
    (UserModel.getUserByUsername as jest.Mock).mockResolvedValue(null);
    await expect(
      UserService.getUserByUsername(mockUser.username),
    ).resolves.toBeNull();

    expect(UserModel.getUserByUsername).toHaveBeenCalledWith(mockUser.username);
    expect(UserModel.getUserByUsername).toHaveBeenCalledTimes(1);
  });

  it("Should return user when user is found with username", async () => {
    (UserModel.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    await expect(
      UserService.getUserByUsername(mockUser.username),
    ).resolves.toEqual(mockUser);

    expect(UserModel.getUserByUsername).toHaveBeenCalledWith(mockUser.username);
    expect(UserModel.getUserByUsername).toHaveBeenCalledTimes(1);
  });
});

describe("User service => getUserById", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should return null when user is not found with id", async () => {
    (UserModel.getUserById as jest.Mock).mockResolvedValue(null);
    await expect(UserService.getUserById(mockUser.id)).resolves.toBeNull();

    expect(UserModel.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(UserModel.getUserById).toHaveBeenCalledTimes(1);
  });

  it("Should return user when user is found with id", async () => {
    (UserModel.getUserById as jest.Mock).mockResolvedValue(mockUser);
    await expect(UserService.getUserById(mockUser.id)).resolves.toEqual(
      mockUser,
    );

    expect(UserModel.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(UserModel.getUserById).toHaveBeenCalledTimes(1);
  });
});
