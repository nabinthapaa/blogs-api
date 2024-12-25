import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import AuthRouter from "./auth";
import BlogRouter from "./blog";
import CommentRouter from "./comment";
import FileRouter from "./uploads";
import ImageRouter from "./images";

const router = Router();

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Api running",
  });
});

router.use("/users", AuthRouter);
router.use("/posts", BlogRouter);
router.use("/posts", CommentRouter);
router.use("/posts", ImageRouter);
router.use("/uploads", FileRouter);

export default router;
