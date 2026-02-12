import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
// import { toPlayRouter } from "./routes/toPlayRouter.mjs";
import { config } from "dotenv";
import { userRouter } from "./routes/userRouter.mjs";

config();

const mongoURI = process.env.MONGO_URI || "";
const port = process.env.PORT || 4000;

if (mongoURI === "") {
  throw "MONGO_URI does not exist in .env";
}

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(json());

// app.use("/toplay", toPlayRouter);

app.use("/users", userRouter);

app.listen(port, async (error) => {
  try {
    if (error) {
      console.error(error);
    }

    await mongoose.connect(mongoURI);
    console.log(
      "API is up and running on port: " + port + ", connected to database",
    );
  } catch (error) {
    console.error(error);
  }
});
