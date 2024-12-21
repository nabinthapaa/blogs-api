import express from "express";
import config from "./config";
import router from "@/routes/index";

const { port: SERVER_PORT } = config;

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on: http://localhost:${SERVER_PORT}/`);
});
