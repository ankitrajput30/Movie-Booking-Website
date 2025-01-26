import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";
import jwt from "jsonwebtoken";

export const addMovies = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not matched" });
  }

  let adminId;

  //verify the token and find the adminId
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });
    // const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    // session.startTransaction();
    await movie.save();
    adminUser.addedMovies.push(movie);
    await adminUser.save();
    // await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Unexpected Error Occured🙂" });
  }

  return res
    .status(201)
    .json({ message: "Movie added Successfully😁", movie });
};

export const getMovies = async (req, res, next) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (error) {
    return console.log(error);
  }
  if (!movies) {
    return res.status(500).json({ message: "Request Failed🙂" });
  }

  return res.status(201).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!movie) {
    return res.status(500).json({ message: "Unable to find movie by Id🙂" });
  }

  return res.status(201).json({ movie });
};
