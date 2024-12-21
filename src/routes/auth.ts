import { Router } from "express";

const router = Router();

router.post("/users/login");

router.post("/users/register", (req, res) => {
  console.log({ res, req });
});

export default router;
