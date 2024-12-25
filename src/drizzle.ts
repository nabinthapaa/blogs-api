import { defineConfig } from "drizzle-kit";
import config from "./config";
import path from "node:path";

const { host, port, user, password, name: database } = config.database;

export default defineConfig({
  dialect: "postgresql",
  schema: path.join(__dirname, "./database/schemas/index.ts"),
  out: path.relative(
    process.cwd(),
    path.join(__dirname, "./database/migrations/"),
  ),
  dbCredentials: {
    host,
    port: +port,
    user,
    password,
    database,
    ssl: false,
  },
  strict: true,
  verbose: true,
});
