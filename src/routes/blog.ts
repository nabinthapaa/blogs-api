import { Router } from "express";

const BlogRouter = Router();

BlogRouter.get("/:id");
BlogRouter.post("/");
BlogRouter.get("/");

export default BlogRouter;
