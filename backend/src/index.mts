import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { toPlayRouter } from "./routes/toPlayRouter.mjs";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(json());

app.use("/toplay", toPlayRouter);

app.listen(3000, async (error) => {
  try {
    if (error) {
      console.error(error);
    }

    await mongoose.connect(
      "mongodb+srv://IngridStanic:E92favIfam94Alav23se@cluster0.c65ojxz.mongodb.net/toPlay?appName=Cluster0",
    );
    console.log("API is up and running on port: 3000, connected to database");
  } catch (error) {
    console.error(error);
  }
});
