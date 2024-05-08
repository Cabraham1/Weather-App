"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import CityCard from "./cityCard";
import DislikeIcon from "../../public/dislike.svg";
import LikeIcon from "../../public/like.svg";
import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
import { WeatherData } from "../../utils/constant";
import OptionSideModal from "../side-modal";

const LargeCityCard = () => {
  const [openViewSideModal, setEditOpenSideModal] = React.useState(true);
  const [viewWeather, setViewWeather] = React.useState<any>();
  const handleLikeClick = () => {
    console.log("Liked!");
  };

  const handleDeleteClick = () => {
    console.log("Deleted!");
  };

  const handleViewClick = (data: {
    cityName: string;
    temperature: string;
    weatherDescription: string;
    population: number;
    isLiked: boolean;
  }) => {
    console.log(data);
    setViewWeather(data);
    setEditOpenSideModal(true);
  };



  return (
    <>
      <Box>
        <Typography
          variant="h5"
          sx={{
            textAlign: "start",
            textTransform: "capitalize",
            fontSize: "1rem",
            color: "gray",
            mb: "2rem",
          }}
        >
          Largest Cities in the World
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {WeatherData.map((data, index) => (
            <Box>
              <CityCard
                key={index}
                dislikeIconSrc={DislikeIcon}
                likeIconSrc={LikeIcon}
                weatherIconSrc={
                  data.weatherDescription === "Sunny"
                    ? SunnyLogo
                    : data.weatherDescription === "Cloudy"
                    ? CloudLogo
                    : RainLogo
                }
                isLiked={data.isLiked}
                cityName={data.cityName}
                temperature={data.temperature}
                weatherDescription={data.weatherDescription}
                population={data.population}
                onLikeClick={handleLikeClick}
                onDeleteClick={handleDeleteClick}
                onViewClick={() => handleViewClick(data)}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <OptionSideModal
        openSideModal={openViewSideModal}
        setOpenSideModal={setEditOpenSideModal}
        SelectedWeatherData={viewWeather}
      />
    </>
  );
};

export default LargeCityCard;
