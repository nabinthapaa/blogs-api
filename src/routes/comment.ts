import { createComment, getComments } from "@/controller/comment";
import { authenticate } from "@/middlewares/authenticate";
import {
  validateRequestBody,
  validateRequestParams,
} from "@/middlewares/validator";
import { asyncHandler } from "@/utils/asyncHandler";
import { commentSchema } from "@/validationSchema/comment";
import { Router } from "express";

const CommentRouter = Router();

CommentRouter.get(
  "/:postId/comments",
  authenticate,
  validateRequestParams(commentSchema.pick({ postId: true })),
  asyncHandler(getComments),
);

CommentRouter.post(
  "/:postId/comments",
  authenticate,
  validateRequestParams(commentSchema.pick({ postId: true })),
  validateRequestBody(commentSchema.pick({ comment: true })),
  asyncHandler(createComment),
);

export default CommentRouter;
