import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { BlogTable } from "./blog";

export const postRelation = relations(BlogTable, ({ one }) => ({
  author: one(UserTable, {
    fields: [BlogTable.author],
    references: [UserTable.id],
  }),
}));
