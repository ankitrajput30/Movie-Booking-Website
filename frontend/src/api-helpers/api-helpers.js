import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios
    .get(`http://localhost:5001/movie/movies`)
    .catch((error) => {
      console.log(error);
    });
  if (res.status !== 201) {
    return console.log("Something went wrong, No data found");
  }

  const data = await res.data;
  return data;
};
