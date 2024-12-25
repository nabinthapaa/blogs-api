import { getImage, uploadImage } from "@/controller/image";
import { authenticate } from "@/middlewares/authenticate";
import { validateRequestParams } from "@/middlewares/validator";
import { asyncHandler } from "@/utils/asyncHandler";
import { upload } from "@/utils/fileUpload";
import { commentSchema } from "@/validationSchema/comment";
import { Router } from "express";

const ImageRouter = Router();

ImageRouter.get(
  "/:postId/image",
  authenticate,
  validateRequestParams(commentSchema.pick({ postId: true })),
  asyncHandler(getImage),
);

ImageRouter.post(
  "/:postId/image",
  authenticate,
  upload.single("image"),
  validateRequestParams(commentSchema.pick({ postId: true })),
  asyncHandler(uploadImage),
);

export default ImageRouter;
