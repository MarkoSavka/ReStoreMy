import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Slider {...settings}>
        <div>
          <img
            src="/images/hero4.jpg"
            alt="hero"
            style={{ display: 'block', width: '100%', maxHeight: 600}}
          />
        </div>
        <div>
          <img
            src="/images/hero5.jpg"
            alt="hero"
            style={{ display: 'block', width: '100%', maxHeight: 550}}
          />
        </div>
        <div>
          <img
            src="/images/hero6.jpg"
            alt="hero"
            style={{ display: 'block', width: '100%', maxHeight: 550}}
          />
        </div>
      </Slider>
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h1" color="blueviolet">
          Welcome to the shop!
        </Typography>
      </Box>
    </Box>
  );
}