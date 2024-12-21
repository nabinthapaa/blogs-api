import { Router } from "express";
import AuthRouter from "./auth";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/checkhealth", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Api running",
  });
});

router.use(AuthRouter);

export default router;
