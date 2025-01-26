import express from "express"
import { addUser, getAllUsers, updateUser, deleteUser, userLogin, getBookingsOfUser } from "../controllers/user-con.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers)
userRouter.post("/signup", addUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.post("/login", userLogin)
userRouter.get("/bookings/:id", getBookingsOfUser)

export default userRouter;