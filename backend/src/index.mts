import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRouter.mjs";
import cookieparser from "cookie-parser";
import { registerRouter } from "./routes/registerRouter.mjs";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;

if (!mongoURI || mongoURI === "") {
  throw Error("MONGO_URI does not exist in .env");
}

if (!jwtSecret || jwtSecret === "") {
  throw Error("JwtSecret does not exist in .env");
}

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(json());
app.use(cookieparser());

app.get("/force-status", (_, res) => {
  res.status(200).json({ message: "The force is with you" });
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use("/users", auth, userRouter);

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
