import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-routes.js";

dotenv.config();


const app = express();

//middlewares
app.use(express.json())
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter)
app.use("/book", bookingRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(5001, () => console.log("Connected to DB and server is running"))
  )
  .catch((e) => console.log(e));
