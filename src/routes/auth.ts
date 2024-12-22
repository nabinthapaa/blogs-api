import { Router } from "express";
import { login, register } from "@/controller/auth";
import { asyncHandler } from "src/utils/asyncHandler";
import { validateRequestBody } from "@/middlewares/validator";
import { userSchema } from "@/validationSchema/user";

const router = Router();

router.post(
  "/login",
  validateRequestBody(userSchema.pick({ username: true, password: true })),
  asyncHandler(login),
);

router.post(
  "/register",
  validateRequestBody(userSchema),
  asyncHandler(register),
);

export default router;
