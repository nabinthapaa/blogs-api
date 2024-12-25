import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { BlogTable } from "./blog";

export const CommentTable = pgTable("comments", {
  id: uuid().primaryKey().defaultRandom(),
  comment: text().notNull(),
  userId: uuid("user_id")
    .references(() => UserTable.id)
    .notNull(),
  postId: uuid("post_id")
    .references(() => BlogTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$type<Date>(),
});
