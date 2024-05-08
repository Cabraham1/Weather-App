import { Box, Typography } from "@mui/material";
import HomeBanner from "../../../../components/home-banner";
export default function Home() {
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            margin: "1rem",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: "2rem",
            }}
          >
            Hello Abraham Christopher!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: "1rem",
              color: "gray",
            }}
          >
            Wednesday, 08 May, 2024
          </Typography>
        </Box>
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
        <HomeBanner />
      </Box>
    </>
  );
}
