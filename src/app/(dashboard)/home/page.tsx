import { Box, Typography } from "@mui/material";
import HomeBanner from "../../../../components/home-banner";
import HomeHeader from "../../../../components/home-header";
import LargeCityCard from "../../../../components/LargeCityCard";

export default function Home() {
  return (
    <>
      <Box>
        <HomeHeader />
        <HomeBanner />
        <Box>
          <Box
            sx={{
              padding: "2rem",
            }}
          >
           
            <Box>
              <LargeCityCard/>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
