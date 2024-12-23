import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { BlogTable } from "./blog";
import { CommentTable } from "./comment";

export const userRelation = relations(UserTable, ({ many }) => ({
  post: many(BlogTable),
  comments: many(CommentTable),
}));

export const postRelation = relations(BlogTable, ({ one, many }) => ({
  author: one(UserTable, {
    fields: [BlogTable.author],
    references: [UserTable.id],
  }),
  comments: many(CommentTable),
}));

export const commentsRelation = relations(CommentTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [CommentTable.userId],
    references: [UserTable.id],
  }),
  post: one(BlogTable, {
    fields: [CommentTable.postId],
    references: [BlogTable.id],
  }),
}));
