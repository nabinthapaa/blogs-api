import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "src/config";

const { host, port, user, password, name: database } = config.database;

export class BaseModel {
  protected static queryClient = postgres({
    host,
    password,
    port: +port,
    user,
    database,
  });

  protected static db() {
    return drizzle(this.queryClient);
  }
}
