import express from "express"
import { getBookingId, newBooking, delBookingId } from "../controllers/booking-con.js";

const bookingRouter = express.Router();

// adminRouter.get("/", getAllUsers)
bookingRouter.post("/", newBooking)
bookingRouter.get("/:id", getBookingId)
bookingRouter.delete("/:id", delBookingId)

export default bookingRouter;