import express, { Router } from "express";
import path from "path";

const FileRouter = Router();

FileRouter.use("/", express.static(path.resolve(__dirname, "../../uploads")));

export default FileRouter;
