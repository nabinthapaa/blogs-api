import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";

export const BlogTable = pgTable("blogs", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  slug: text().notNull(),
  content: text().notNull(),
  author: uuid()
    .references(() => UserTable.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$type<Date>(),
});
