import React, { useState, useEffect } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import { Box, Typography } from "@mui/material";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        variant="h4"
        margin={"auto"}
        padding={2}
        width={"40%"}
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
    </Box>
  );
};

export default Movies;
