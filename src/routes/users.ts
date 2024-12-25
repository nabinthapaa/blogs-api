import { getUserInfo, updateUser } from "@/controller/users";
import { authenticate } from "@/middlewares/authenticate";
import { asyncHandler } from "@/utils/asyncHandler";
import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/profile", authenticate, asyncHandler(getUserInfo));
UserRouter.patch("/profile", authenticate, asyncHandler(updateUser));

export default UserRouter;
