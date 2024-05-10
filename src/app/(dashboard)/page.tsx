"use client";
import { Box } from "@mui/material";
import MainPage from "./home/page";
export default function Home() {
  const isFirstTime = localStorage.getItem("firstTime") !== "true";

  // If it's the first time, trigger a hard reload of the window
  if (isFirstTime) {
    localStorage.setItem("firstTime", "true");
    window.location.reload();
  }
  return (
    <Box>
      <MainPage />
    </Box>
  );
}
