import { Close, ModeEditOutlined, PeopleAlt } from "@mui/icons-material";
import { Box, Button, Dialog, Typography } from "@mui/material";
import Image from "next/image";
import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
import LikeIcon from "../../public/like.svg";
import disLikeIcon from "../../public/dislike.svg";
import WeatherCard from "../home-banner/weatherCard";
import ViewNote from "../Note/viewNote";
import { noteDatas } from "../../utils/constant";
import { AlertDialog, AlertDialogText } from "../Reusable-Dialog";
import { useState } from "react";
import SideModalCard from "../home-banner/SideModalCard";

interface Note {
  id: number;
  content: string;
}

const Index: React.FC<{
  openSideModal: boolean;
  setOpenSideModal: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedWeatherData: any;
}> = ({ openSideModal, setOpenSideModal, SelectedWeatherData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogView, setOpenDialogView] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  console.log("SelectedWeatherData", SelectedWeatherData);
  const handleAddNote = () => {
    setOpenDialogAdd(false);
  };

  const handleViewNote = (noteId: number, noteContent: string) => {
    setSelectedNote({
      id: noteId,
      content: noteContent,
    });
    setOpenDialogView(true);
  };

  const handleDeleteNote = (noteId: number, noteContent: string) => {
    setSelectedNote({
      id: noteId,
      content: noteContent,
    });
    setOpenDialog(true);
  };

  const handleDelete = () => {
    if (selectedNote) {
      setSelectedNote(null);
      setOpenDialog(false);
    }
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };
  const handleClickCloseView = () => {
    setOpenDialogView(false);
  };
  const handleClickCloseAdd = () => {
    setOpenDialogAdd(false);
  };
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
          <Box>
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
                {SelectedWeatherData?.favorite ? (
                  <Image src={LikeIcon} alt="like" width={30} height={30} />
                ) : (
                  <Image
                    src={disLikeIcon}
                    alt="dislike"
                    width={30}
                    height={30}
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
                onClick={() => setOpenDialogAdd(true)}
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
                    SelectedWeatherData?.weatherData?.temperature
                      ? parseInt(SelectedWeatherData.weatherData.temperature) >=
                        30
                        ? SunnyLogo
                        : parseInt(
                            SelectedWeatherData.weatherData.temperature
                          ) >= 20
                        ? CloudLogo
                        : RainLogo
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
              {SelectedWeatherData?.city.toponymName}
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
              {SelectedWeatherData?.weatherData.temperature}°C
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
            {SelectedWeatherData?.weatherData.clouds === "n/a"
              ? "Normal Weather Today"
              : SelectedWeatherData?.weatherData.clouds}
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
              {SelectedWeatherData?.city.population}
            </Typography>
            <SideModalCard
              tempDegree={`${SelectedWeatherData?.weatherData.temperature} °C`}
              humidityDegree={`${SelectedWeatherData?.weatherData.humidity} %`}
              windDegree={`${
                SelectedWeatherData?.weatherData.windSpeed ?? 0
              } m/s`}
            />
          </Box>
          <Box
            sx={{
              my: "2rem",
              width: "100%",
              height: "1px",
              bgcolor: "gray",
            }}
          />
          <Box>
            <WeatherCard />
          </Box>
          {/* table section */}
          <Box
            sx={{
              border: "1px solid gray",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              width: "90%",
              my: "2rem",
              mx: "auto",
              px: "1rem",
              py: ".5rem",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: "start",
                textTransform: "capitalize",
                fontSize: "1rem",
                color: "red",
                py: "1rem",
              }}
            >
              Notes
            </Typography>
            {noteDatas?.map((note) => (
              <ViewNote
                key={note.id}
                note={note}
                onView={() => {
                  handleViewNote(note.id, note.content);
                }}
                onDelete={() => {
                  handleDeleteNote(note.id, note.content);
                }}
              />
            ))}
          </Box>
        </Box>
      </Dialog>
      {/* delete modal  */}
      <AlertDialog
        open={openDialog}
        onClose={handleClickClose}
        onAgree={handleDelete}
        title={"Delete"}
        deleteColor={true}
        content={"Do you wish to delete this Note?."}
        disagreeText={"No"}
        agreeText={"Yes, Delete"}
      />

      {/* view modal ˝ */}
      <AlertDialog
        open={openDialogView}
        onClose={handleClickCloseView}
        title={"My Note"}
        deleteColor={false}
        content={selectedNote?.content || ""}
        disagreeText={"No"}
      />

      {/* view modal ˝ */}
      <AlertDialogText
        open={openDialogAdd}
        onClose={handleClickCloseAdd}
        onAgree={handleAddNote}
        title={"New Note"}
        disagreeText={"Cancel"}
        agreeText={"Save Note"}
      />
    </>
  );
};

export default Index;
