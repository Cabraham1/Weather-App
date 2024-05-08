import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface WeatherData {
  time: string;
  iconSrc: string;
  temperature: string;
}

const WeatherCard: React.FC<WeatherData> = ({ time, iconSrc, temperature }) => {
  return (
    <Box
      sx={{
        border: "1px solid white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        background: "linear-gradient(#957DCD, #523D7F)",
        borderRadius: "10px",
        width: "100px",
        px: "1rem",
        py: "1rem",
        textAlign: "center", 
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textTransform: "capitalize",
          fontSize: "1rem",
          color: "white",
        }}
      >
        {time}
      </Typography>
      <Box>
        <Image src={iconSrc} alt="icon" width={30} height={30} />
      </Box>
      <Typography
        variant="h5"
        sx={{
          textTransform: "capitalize",
          fontSize: "1rem",
          color: "white",
        }}
      >
        {temperature}
      </Typography>
    </Box>
  );
};

const Index = () => {
  const weatherData = [
    { time: "10 AM", iconSrc: "/sunny.svg", temperature: "23°C" },
    { time: "1 PM", iconSrc: "/cloudy.svg", temperature: "25°C" },
    { time: "4 PM", iconSrc: "/rain.svg", temperature: "20°C" },
    { time: "7 PM", iconSrc: "/sunny.svg", temperature: "18°C" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {weatherData.map((data, index) => (
        <WeatherCard
          key={index}
          time={data.time}
          iconSrc={data.iconSrc}
          temperature={data.temperature}
        />
      ))}
    </Box>
  );
};

export default Index;
