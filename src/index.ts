import { genericErrorHandler, routeNotFound } from "@/middlewares/errorHandler";
import router from "@/routes/index";
import express from "express";
import config from "./config";

const { port: SERVER_PORT } = config;

const app = express();

app.use(express.json());
app.use("/api", router);

// INFO: Middlewares for handling error and invalid route
app.use(routeNotFound);
app.use(genericErrorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on: http://localhost:${SERVER_PORT}/`);
});
