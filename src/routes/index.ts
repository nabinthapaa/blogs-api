import { Router } from "express";
import AuthRouter from "./auth";
import { StatusCodes } from "http-status-codes";
import BlogRouter from "./blog";

const router = Router();

router.get("/checkhealth", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Api running",
  });
});

router.use("/users", AuthRouter);
router.use("/posts", BlogRouter);

export default router;
