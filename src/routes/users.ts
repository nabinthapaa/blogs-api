import { getUserInfo, updateUser } from "@/controller/users";
import { authenticate } from "@/middlewares/authenticate";
import { validateRequestBody } from "@/middlewares/validator";
import { asyncHandler } from "@/utils/asyncHandler";
import { userSchema } from "@/validationSchema/user";
import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/profile", authenticate, asyncHandler(getUserInfo));
UserRouter.patch(
  "/profile",
  authenticate,
  validateRequestBody(userSchema.partial()),
  asyncHandler(updateUser),
);

export default UserRouter;
