import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import VerticalCard from "./VerticalCard";
import WeatherCard from "./weatherCard";

const Index = () => {
  return (
    <>
      <Box
        sx={{
          padding: "2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "start",
            textTransform: "capitalize",
            fontSize: "1rem",
            color: "gray",
          }}
        >
          Today Weather Information
        </Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          borderRadius: "10px",
          bgcolor: "black",
          mx: 2,
          p: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid sx={{ minHeight: "100%" }} item xs={12} lg={6}>
            <Box sx={{ height: "100%", overflow: "hidden" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/sunny.svg"
                    alt="banner"
                    width={150}
                    height={150}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      textAlign: "start",
                      textTransform: "capitalize",
                      fontSize: "5rem",
                      color: "white",
                    }}
                  >
                    23°
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "start",
                      textTransform: "capitalize",
                      fontSize: ".8rem",
                      color: "white",
                    }}
                  >
                    Wednesday, 08 May 2024 | 10:00AM
                  </Typography>
                </Box>

                <Box>
                  <VerticalCard />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid sx={{ minHeight: "100%" }} item xs={12} lg={6}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "start",
                  height: "80%",
                  gap: "1rem",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "start",
                    textTransform: "capitalize",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Today
                </Typography>
                <Box>
                  <WeatherCard />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Index;
