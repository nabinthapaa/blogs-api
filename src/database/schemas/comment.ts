import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { BlogTable } from "./blog";

export const CommentTable = pgTable("comment", {
  id: uuid().primaryKey().defaultRandom(),
  comment: text().notNull(),
  userId: uuid("user_id")
    .references(() => UserTable.id)
    .notNull(),
  postId: uuid("post_id")
    .references(() => BlogTable.id)
    .notNull(),
});
