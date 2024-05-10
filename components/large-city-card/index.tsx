"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CityCard from "./cityCard";
import DislikeIcon from "../../public/dislike.svg";
import LikeIcon from "../../public/like.svg";
import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
import OptionSideModal from "../side-modal";
import useWeatherStore from "../../utils/zustandStore/useWeatherStore";
import useLikesStore from "../../utils/zustandStore/useLikesStore";
import { usePathname } from "next/navigation";
import EmptyCard from "../empty-card";

const LargeCityCard = () => {
  const path = usePathname();

  const LargerCitiesData = useWeatherStore(
    (state) => state.activeCitiesWeather
  );
  const [openViewSideModal, setEditOpenSideModal] = useState(false);
  const [viewWeather, setViewWeather] = useState<any>();
  const { likes, updateLikes } = useLikesStore((state) => state);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("LargerCitiesData", JSON.stringify(LargerCitiesData));
  }, [LargerCitiesData]);

  useEffect(() => {
    // Initialize likes count
    const initialLikes = LargerCitiesData.reduce(
      (acc: { [key: number]: number }, cityWeather: any) => {
        acc[cityWeather.city.geonameId] = cityWeather.favorite ? 1 : 0;
        return acc;
      },
      {}
    );
    useLikesStore.getState().setLikes(initialLikes);
  }, [LargerCitiesData]);

  useEffect(() => {
    // Update likes count when likes object changes
    const count = Object.keys(likes).length;
    setLikesCount(count);
  }, [likes]);

  const handleLikeClick = (geonameId: number) => {
    updateLikes(geonameId, !likes[geonameId]);
    useWeatherStore.getState().toggleFavorite(geonameId);
  };

  const handleDeleteClick = (geonameId: number) => {
    useWeatherStore.getState().toggleDelete(geonameId);
  };

  const handleViewClick = (cityWeather: any) => {
    setViewWeather(cityWeather);
    setEditOpenSideModal(true);
  };

  // Filter LargerCitiesData based on the path
  const filteredCitiesData =
    path === "/favorite"
      ? LargerCitiesData.filter((cityWeather) => cityWeather.favorite)
      : LargerCitiesData;

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          textAlign: "start",
          textTransform: "capitalize",
          fontSize: "1rem",
          color: "gray",
          paddingY: "2rem",
        }}
      >
        {path === "/favorite"
          ? "Favorite Cities"
          : "Largest Cities in the World"}
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
        {filteredCitiesData.length === 0 ? (
          <Box>
            <EmptyCard />
          </Box>
        ) : (
          filteredCitiesData
            ?.sort((a, b) =>
              a.city.toponymName.localeCompare(b.city.toponymName)
            )
            .map((cityWeather) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
                key={cityWeather.city.geonameId}
              >
               
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
                      // Increment or decrement likes count locally
                      const updatedCount = cityWeather.favorite
                        ? likesCount + 1
                        : likesCount - 1;
                      setLikesCount(updatedCount);
                    }}
                    onDeleteClick={() =>
                      handleDeleteClick(cityWeather.city.geonameId)
                    }
                    onViewClick={() => handleViewClick(cityWeather)}
                  />
                </Box>
            ))
        )}
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
