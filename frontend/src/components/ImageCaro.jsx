import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import SkipNextIcon from '@mui/icons-material/SkipNext';

const images = [
  "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/08/Sofia-Carson-and-Nicholas-Galitzine-embrace-in-Purple-Hearts.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQgvXKDKRvshELeuSjm2xJBt_lt_FSh_CvQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5JCCwevHYbD7vDVy0e-kDiDvleKWmX36g4w&s",
  "https://occ-0-8407-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABartTBAq6pbBt2fQcdx4TwdPMuCeitvUcAHRNCkqIr1SxcZFDE4mpPEYT0lBIG50QLuwFkZv41rRT0leJ3kHC9C6MxZTF7j50HwY.jpg?r=ea2",
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 10000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // const handlePrev = () => {
  //   setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  // };

  return (
    <Box
      width={"80%"}
      height={"50vh"}
      margin={"auto"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Carousel Images */}
      <Box
        display="flex"
        width="100%"
        height="100%"
        sx={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            width="100%"
            flexShrink={0} // Ensure each image takes full width
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons (Optional) */}
      {/* <Button
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "black",
          zIndex: 10,
        }}
      >
        <skipPreviousIcon />
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          zIndex: 10,
        }}
      >
        <skipNextIcon />
      </Button> */}
    </Box>
  );
};

export default ImageCarousel;
