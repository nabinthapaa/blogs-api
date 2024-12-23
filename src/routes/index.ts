import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import AuthRouter from "./auth";
import BlogRouter from "./blog";
import CommentRouter from "./comment";

const router = Router();

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Api running",
  });
});

router.use("/users", AuthRouter);
router.use("/posts", BlogRouter);
router.use("/posts", CommentRouter);

export default router;
