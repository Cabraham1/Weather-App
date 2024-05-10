"use client";
import { Box } from "@mui/material";
import MainPage from "./home/page";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const isFirstTime = localStorage.getItem("firstTime") !== "true";

    if (isFirstTime) {
      localStorage.setItem("firstTime", "true");
      window.location.reload();
    }
  }, []); 

  return (
    <Box>
      <MainPage />
    </Box>
  );
}
