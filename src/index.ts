import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.status(200).json({
    message: "connected succesfully",
  });
});

app.listen(4000, () => {
  console.log("Listening on: http://localhost:4000/");
});
