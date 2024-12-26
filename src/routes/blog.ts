import { createPost, getPostById, getPosts } from "@/controller/blogs";
import { authenticate } from "@/middlewares/authenticate";
import {
  validateRequestBody,
  validateRequestParams,
} from "@/middlewares/validator";
import { blogSchema } from "@/validationSchema/blog";
import { validateIdSchema } from "@/validationSchema/param";
import { Router } from "express";
import { asyncHandler } from "src/utils/asyncHandler";

const BlogRouter = Router();

BlogRouter.get(
  "/:id",
  authenticate,
  validateRequestParams(validateIdSchema),
  asyncHandler(getPostById),
);

BlogRouter.post(
  "/",
  authenticate,
  validateRequestBody(blogSchema.omit({ author: true })),
  asyncHandler(createPost),
);

BlogRouter.get("/", authenticate, asyncHandler(getPosts));

export default BlogRouter;
