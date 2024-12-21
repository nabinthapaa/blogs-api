import { defineConfig } from "drizzle-kit";
import config from "./config";
import path from "node:path";

const { host, port, user, password, name: database } = config.database;

export default defineConfig({
  dialect: "postgresql",
  schema: path.resolve(__dirname, "./database/schemas/index.ts"),
  out: path.resolve(__dirname, "./database/migrations/"),
  dbCredentials: {
    url: `postgres://${user}:${password}@${host}:${port}/${database}`,
  },
  strict: true,
  verbose: true,
});
