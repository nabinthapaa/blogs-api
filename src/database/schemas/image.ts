import {
  decimal,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { BlogTable } from "./blog";

export const ImageTable = pgTable("images", {
  id: uuid().primaryKey().defaultRandom(),
  filename: varchar({ length: 255 }).notNull(),
  size: decimal().notNull().$type<number>(),
  postId: uuid("post_id")
    .references(() => BlogTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$type<Date>(),
});
