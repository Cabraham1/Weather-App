"use client";
import { Box } from "@mui/material";
import HomeBanner from "../../../../components/home-banner";
import HomeHeader from "../../../../components/home-header";
import LargeCityCard from "../../../../components/large-city-card";
import { useEffect, useState } from "react";
import { fetchCitiesWeather } from "../../../../utils/functions";
import useWeatherStore from "../../../../utils/zustandStore/useWeatherStore";
import LoaderBackdrop from "../../../../components/common/loader";

export default function Favorite() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = localStorage.getItem("LargerCitiesData");
        if (localData) {
          const parsedData = JSON.parse(localData);
          if (parsedData && parsedData.length > 0) {
            // Check if parsedData is not empty
            useWeatherStore.getState().activeCitiesWeather = parsedData;
          } else {
            await fetchCitiesWeather();
          }
        } else {
          await fetchCitiesWeather();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoaderBackdrop />;
  }

  return (
    <>
      <Box>
        <HomeHeader />
        <Box>
          <Box
            sx={{
              padding: "2rem",
            }}
          >
            <Box>
              <LargeCityCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
