import {
  Close,
  ModeEditOutlined,
  MoreVert,
  PeopleAlt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
import LikeIcon from "../../public/like.svg";
import disLikeIcon from "../../public/dislike.svg";
import HorizontalCard from "../home-banner/HorizontalCard";

const Index: React.FC<{
  openSideModal: boolean;
  setOpenSideModal: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedWeatherData: any;
}> = ({ openSideModal, setOpenSideModal, SelectedWeatherData }) => {
  return (
    <>
      <Dialog open={openSideModal} onClose={() => setOpenSideModal(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "20px",
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 1102,
            overflow: "scroll",
            height: "100vh",
            width: { sm: "621px" },
          }}
        >
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  width: "fit-cont%",
                }}
              >
                {!false ? (
                  <Image
                    src={disLikeIcon}
                    alt="dislike"
                    width={30}
                    height={30}
                    // onClick={onLikeClick}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Image
                    src={LikeIcon}
                    alt="like"
                    width={30}
                    height={30}
                    // onClick={onLikeClick}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Box>
              <Button
                sx={{
                  float: "right",
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "red",
                  },
                }}
                variant="contained"
                startIcon={<ModeEditOutlined />}
              >
                Add Note
              </Button>
              <Button
                onClick={() => setOpenSideModal(false)}
                sx={{ float: "right" }}
              >
                <Close
                  sx={{
                    color: "red",
                  }}
                />
              </Button>
            </Box>
            <Box>
              <Box>
                <Image
                  src={
                    SelectedWeatherData?.weatherDescription === "Sunny"
                      ? SunnyLogo
                      : SelectedWeatherData?.weatherDescription === "Cloudy"
                      ? CloudLogo
                      : RainLogo
                  }
                  alt="banner"
                  width={150}
                  height={150}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "fit-content",
              gap: "3rem",
              px: "10px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: "start",
                textTransform: "capitalize",
                fontWeight: "900",
                fontSize: "3.5rem",
              }}
            >
              {SelectedWeatherData?.cityName}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                textAlign: "start",
                textTransform: "capitalize",
                fontSize: "2rem",
                color: "red",
              }}
            >
              {SelectedWeatherData?.temperature}
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: "1.5rem",
              color: "#929C21",
              px: "10px",
            }}
          >
            {SelectedWeatherData?.weatherDescription}
          </Typography>

          {/* population section */}
          <Box
            sx={{
              borderRadius: "10px",
              bgcolor: "#F0F2F5",
              px: "1rem",
              py: ".5rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              gap: "1rem",
              width: "fit-content",
            }}
          >
            <PeopleAlt color="primary" />
            <Typography
              sx={{
                textAlign: "start",
                textTransform: "capitalize",
                fontSize: "1.5rem",
              }}
            >
              {SelectedWeatherData?.population}
            </Typography>
           <HorizontalCard />
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Index;
