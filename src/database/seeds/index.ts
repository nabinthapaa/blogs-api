import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../../config";
import { UserTable } from "../schemas";

const { host, port, user, password, name: database } = config.database;

const main = async () => {
  const client = postgres({
    password,
    port: +port,
    user,
    database,
    max: 1,
    hostname: host,
  });

  const db = drizzle(client);
  const seeedUser = {
    username: "username123",
    password: "password123",
    email: "emai@test.com",
    fullName: "full name",
  };

  console.log("Seed start");
  await db.insert(UserTable).values({
    ...seeedUser,
    password: await bcrypt.hash(seeedUser.password, 10),
  });
  console.log("Seed done");
  console.log("User with following details selected", seeedUser);
};

main();
