import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const HorizontalCard = () => {
  return (
    <Box
      sx={{
        border: "1px solid white",
        borderRadius: "10px",
        px: "1rem",
        py: "1rem",
        my: "1rem",
        display: "flex",
        flexDirection: "row",
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
        <Image src="/sunny.svg" alt="banner" width={30} height={30} />
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
            30%
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
            Precipitation
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
            250%
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
          9km/h
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

export default HorizontalCard;
