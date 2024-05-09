import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CityCard from "./cityCard";
import DislikeIcon from "../../public/dislike.svg";
import LikeIcon from "../../public/like.svg";
import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
import OptionSideModal from "../side-modal";
import useWeatherStore from "../../utils/zustandStore/useWeatherStore";

const LargeCityCard = () => {
  const LargerCitiesData = useWeatherStore(
    (state) => state.activeCitiesWeather
  );
  const [openViewSideModal, setEditOpenSideModal] = React.useState(false); // Changed default state to false
  const [viewWeather, setViewWeather] = React.useState<any>();

  useEffect(() => {
    localStorage.setItem("LargerCitiesData", JSON.stringify(LargerCitiesData));
  }, [LargerCitiesData]);

  const handleLikeClick = (geonameId: number) => {
    const updatedActiveCitiesWeather = LargerCitiesData.map(
      (cityWeather: { city: { geonameId: number }; favorite: any }) =>
        cityWeather.city.geonameId === geonameId
          ? { ...cityWeather, favorite: !cityWeather.favorite }
          : cityWeather
    );
    setViewWeather(updatedActiveCitiesWeather);

    useWeatherStore.getState().toggleFavorite(geonameId);
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
          {LargerCitiesData?.map((cityWeather, index) => (
            <Box key={cityWeather.city.geonameId}>
              <CityCard
                dislikeIconSrc={DislikeIcon}
                likeIconSrc={LikeIcon}
                weatherIconSrc={
                  cityWeather?.weatherData?.temperature
                    ? parseInt(cityWeather.weatherData.temperature) >= 30
                      ? SunnyLogo
                      : parseInt(cityWeather.weatherData.temperature) >= 20
                      ? CloudLogo
                      : RainLogo
                    : RainLogo
                }
                isLiked={cityWeather.favorite}
                cityName={cityWeather.city.toponymName}
                temperature={cityWeather.weatherData.temperature}
                weatherDescription={
                  cityWeather.weatherData.clouds === "n/a"
                    ? "Normal Weather Today"
                    : cityWeather.weatherData.clouds
                }
                population={cityWeather.city.population}
                onLikeClick={() => {
                  handleLikeClick(cityWeather.city.geonameId);
                }}
                onDeleteClick={handleDeleteClick}
                // onViewClick={() =>
                //   handleViewClick({
                //     cityName: cityWeather.city.toponymName,
                //     temperature: cityWeather.weatherData.temperature,
                //     weatherDescription: cityWeather.weatherData.weatherCondition,
                //     population: cityWeather.city.population,
                //     isLiked: cityWeather.favorite,
                //   })
                // }
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
