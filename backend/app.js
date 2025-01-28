import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS package

import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-routes.js";

dotenv.config();

const app = express();

// Middleware to enable CORS
app.use(
  cors({
    origin: "*", // Allow requests from frontend URL
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

//middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/book", bookingRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(5001, () => console.log("Connected to DB and server is running"))
  )
  .catch((e) => console.log(e));
