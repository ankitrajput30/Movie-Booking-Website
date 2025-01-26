import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  // Validate input fields
  if (!movie || !date || !seatNumber || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }
  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not found with given ID" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not found with given ID" });
  }
  // Validate date format
  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save();
    await existingMovie.save();
    await booking.save();
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res
      .status(500)
      .json({ message: "Unable to create a booking now!🙂" });
  }

  return res.status(201).json({ booking });
};

export const getBookingId = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res
      .status(500)
      .json({ message: "Unable to find a booking by this ID!🙂" });
  }
  return res.status(201).json({ booking });
};

export const delBookingId = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndDelete(id).populate("user movie");

    // Check if booking is found
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found with the given ID🙂" });
    }

    // Safely remove the booking from user and movie
    if (booking.user) {
      await booking.user.bookings.pull(booking);
      await booking.user.save();
    }

    if (booking.movie) {
      await booking.movie.bookings.pull(booking);
      await booking.movie.save();
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({ message: "Error deleting booking" });
  }

  return res.status(200).json({ message: "Deleted Successfully😁" });
};
