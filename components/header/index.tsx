import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { SearchBar } from "../search-bar/one";
import { fetchWeather, searchLocation } from "../../utils/functions";
import LoaderBackdrop from "../common/loader";
import { WeatherModal } from "../Reusable-Dialog";
import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";

const Header: React.FC<{
  small: boolean;
  large: boolean;
  openSmallClick: () => void;
  openLargeClick: () => void;
}> = ({ small, large, openSmallClick, openLargeClick }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const searchQuery = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await searchLocation(query);
      if (data.geonames.length > 0) {
        const { lat, lng } = data.geonames[0];
        const WeatherData = await fetchWeather(lat, lng);
        setWeatherData(WeatherData);
      } else {
      }
    } catch (error) {
      console.error("Error handling search query:", error);
    } finally {
      setIsLoading(false);
      setOpenDialog(true);
      setWeatherData(null);
    }
  };

  return (
    <>
      {isLoading && <LoaderBackdrop />}
      <Box
        sx={{
          height: "90px",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          ...(large && { marginLeft: { xs: "0px", md: "300px" } }),
          zIndex: 1000,
        }}
      >
        <Box
          onClick={openLargeClick}
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            ...(large == false
              ? { display: { xs: "none", md: "block" } }
              : { display: "none" }),
            paddingLeft: "25px",
          }}
        >
          <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
        </Box>
        <Box
          onClick={openSmallClick}
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            ...(small == false
              ? { display: { xs: "block", md: "none" } }
              : { display: "none" }),
            paddingLeft: "20px",
          }}
        >
          <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
        </Box>
        <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <SearchBar
              sendQuery={(data: string) => searchQuery && searchQuery(data)}
            />

            <Box sx={{ marginRight: "40px" }}>
              <Image alt="bell" width={24} height={24} src="/bell.svg" />
              {/* add count here  */}
            </Box>
          </Box>
        </Box>
      </Box>
      <WeatherModal
        open={openDialog}
        location={weatherData?.stationName}
        onClose={() => setOpenDialog(false)}
        disagreeText="Close"
        title="Weather Information"
        weatherLogo={
          weatherData?.temperature
            ? parseInt(weatherData.temperature) >= 30
              ? SunnyLogo
              : parseInt(weatherData.temperature) >= 20
              ? CloudLogo
              : RainLogo
            : RainLogo
        }
        tempDegree={weatherData?.temperature}
        humidityDegree={weatherData?.humidity}
        windDegree={weatherData?.windSpeed}
        isError={weatherData == null ? true : false}
      />
    </>
  );
};

export default Header;
