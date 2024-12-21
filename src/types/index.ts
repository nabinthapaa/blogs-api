import { userSchema } from "src/validationSchema/user";
import { z } from "zod";

export interface IUser extends z.infer<typeof userSchema> {}
