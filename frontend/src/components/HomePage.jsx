import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import ImageCarousel from "./ImageCaro";

const HomePage = () => {
  const [movies, setMovies] = React.useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(movies);
  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      {/* <Box margin={"auto"} width={"80%"} height={"40vh"} padding={2}>
        <img
          src="https://static1.srcdn.com/wordpress/wp-content/uploads/2022/08/Sofia-Carson-and-Nicholas-Galitzine-embrace-in-Purple-Hearts.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5"
          alt="Purple Hearts"
          width={"100%"}
          height={"100%"}
        />
      </Box> */}
      <ImageCarousel />
      <Box margin={"auto"} padding={"5"}>
        <Typography variant="h3" textAlign={"center"}>
          Latest Released Movies
        </Typography>
      </Box>
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
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
