import { UserTable } from "@/database/schemas";
import { eq } from "drizzle-orm";
import { BaseModel } from "./BaseModel";
import { IUser } from "@/types/index";

export class UserModel extends BaseModel {
  static async getUserByEmail(email: string) {
    return await UserModel.db()
      .select({
        id: UserTable.id,
        username: UserTable.username,
        email: UserTable.email,
        fullName: UserTable.fullName,
        createdAt: UserTable.createdAt,
        updatedAt: UserTable.updatedAt,
      })
      .from(UserTable)
      .where(eq(UserTable.email, email));
  }

  static async getUserById(id: string) {
    return await UserModel.db()
      .select({
        id: UserTable.id,
        username: UserTable.username,
        email: UserTable.email,
        fullName: UserTable.fullName,
        createdAt: UserTable.createdAt,
        updatedAt: UserTable.updatedAt,
      })
      .from(UserTable)
      .where(eq(UserTable.id, id));
  }

  static async getUserByUsername(username: string) {
    return await UserModel.db()
      .select({
        id: UserTable.id,
        username: UserTable.username,
        email: UserTable.email,
        fullName: UserTable.fullName,
        createdAt: UserTable.createdAt,
        updatedAt: UserTable.updatedAt,
      })
      .from(UserTable)
      .where(eq(UserTable.username, username));
  }

  static async updateUser(id: string, data: Partial<IUser>) {
    return await UserModel.db()
      .update(UserTable)
      .set({ ...data })
      .where(eq(UserTable.id, id))
      .returning({
        id: UserTable.id,
        username: UserTable.username,
        email: UserTable.email,
        fullName: UserTable.fullName,
        createdAt: UserTable.createdAt,
        updatedAt: UserTable.updatedAt,
      });
  }

  static async createUser(data: IUser) {
    return await UserModel.db()
      .insert(UserTable)
      .values({ ...data })
      .returning({
        id: UserTable.id,
        username: UserTable.username,
        email: UserTable.email,
        fullName: UserTable.fullName,
        createdAt: UserTable.createdAt,
        updatedAt: UserTable.updatedAt,
      });
  }
}
