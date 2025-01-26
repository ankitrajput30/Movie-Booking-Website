import express from "express"
import { addMovies, getMovies, getMovieById } from "../controllers/movie-con.js";

const movieRouter = express.Router();

// adminRouter.get("/", getAllUsers)
movieRouter.post("/", addMovies)
movieRouter.get("/movies", getMovies)
movieRouter.get("/:id", getMovieById)

export default movieRouter;