"use client";
import { Box } from "@mui/material";
import HomeBanner from "../../../../components/home-banner";
import HomeHeader from "../../../../components/home-header";
import LargeCityCard from "../../../../components/large-city-card";
import { useEffect, useState } from "react";
import {
  fetchCitiesWeather,
  fetchWeather,
  requestLocationPermission,
} from "../../../../utils/functions";
import useWeatherStore from "../../../../utils/zustandStore/useWeatherStore";
import LoaderBackdrop from "../../../../components/common/loader";
import SunnyLogo from "../../../../public/sunny.svg";
import CloudLogo from "../../../../public/cloudy.svg";
import RainLogo from "../../../../public/rain.svg";
import { WeatherDataProps } from "../../../../types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = localStorage.getItem("LargerCitiesData");
        if (localData) {
          const parsedData = JSON.parse(localData);
          if (parsedData && parsedData.length > 0) {
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

    const getLocationAndFetchWeather = async () => {
      try {
        const { latitude, longitude } = await requestLocationPermission();
        const weatherData = await fetchWeather(latitude, longitude);
        if (weatherData) {
          localStorage.setItem("UserWeatherData", JSON.stringify(weatherData));
        }
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    fetchData();
    getLocationAndFetchWeather();
  }, [
    fetchCitiesWeather,
    requestLocationPermission,
    fetchWeather,
    useWeatherStore,
  ]);

  const weatherDataString = localStorage.getItem("UserWeatherData");
  const weatherData: WeatherDataProps | null = weatherDataString
    ? JSON.parse(weatherDataString)
    : null;
  if (isLoading) {
    return <LoaderBackdrop />;
  }

  return (
    <>
      <Box>
        <HomeHeader />
        <HomeBanner
          tempDegree={weatherData?.temperature.toString() || "40"}
          weatherLogo={
            weatherData?.temperature
              ? weatherData.temperature >= 30
                ? SunnyLogo
                : weatherData.temperature >= 20
                ? CloudLogo
                : RainLogo
              : RainLogo
          }
        />
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
