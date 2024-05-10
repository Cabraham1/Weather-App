import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { SideModalCardProps } from "../../types";



const SideModalCard: React.FC<SideModalCardProps> = ({
  humidityDegree,
  windDegree,
  isRow,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid white",
        borderRadius: "10px",
        px: "1rem",
        py: "1rem",
        my: "1rem",
        display: "flex",
        flexDirection: isRow ? "row" : "column",
        gap: "1rem",
        background: "linear-gradient(#957DCD, #523D7F)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Image src="/humidity.svg" alt="banner" width={30} height={30} />
        <Box>
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: ".9rem",
              color: "white",
            }}
          >
            {humidityDegree}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: ".9rem",
              color: "white",
            }}
          >
            Humidity
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Image src="/wind.svg" alt="banner" width={30} height={30} />
        <Box>
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: ".9rem",
              color: "white",
            }}
          >
            {windDegree}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: ".9rem",
              color: "white",
            }}
          >
            Wind Speed
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SideModalCard;
