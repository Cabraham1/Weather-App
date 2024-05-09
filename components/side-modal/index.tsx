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
import { AlertDialog, AlertDialogText } from "../Reusable-Dialog";
import { useState } from "react";
import SideModalCard from "../home-banner/SideModalCard";
import useWeatherStore from "../../utils/zustandStore/useWeatherStore";
import LoaderBackdrop from "../common/loader";
import toast from "react-hot-toast";

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
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);

  const handleAddNote = () => {
    const cityId = SelectedWeatherData.city.geonameId;
    if (newNote.trim() !== "") {
      setIsLoading(true);
      const newNoteId = Date.now(); // Generate unique ID for the new note
      useWeatherStore.getState().addNote(cityId, newNote.trim(), newNoteId); // Pass the new note ID
      setNotes([...notes, { id: newNoteId, content: newNote.trim() }]);
      setIsLoading(false);
    }
    setNewNote("");
    setOpenSideModal(false);
    toast.success("Note added Successfully!");
  };

  const handleViewNote = (noteId: number, noteContent: string) => {
    setSelectedNote({
      id: noteId,
      content: noteContent,
    });
    setOpenDialogView(true);
  };

  const handleDeleteNote = (noteId: number, noteContent: string) => {
    setOpenDialog(true);
    setSelectedNote({
      id: noteId,
      content: noteContent,
    });
  };
  const handleEditNote = (noteId: number, noteContent: string) => {
    setEditedNote({
      id: noteId,
      content: noteContent,
    });
    setOpenDialogAdd(true);
  };

  const handleSaveEditedNote = () => {
    if (editedNote) {
      const cityId = SelectedWeatherData.city.geonameId;
      const noteIndex = SelectedWeatherData.notes.findIndex(
        (note: Note) => note.id === editedNote.id
      );
      if (noteIndex !== -1) {
        const updatedNotes = [...SelectedWeatherData.notes];
        updatedNotes[noteIndex].content = editedNote.content; // Update content in the local state
        useWeatherStore
          .getState()
          .editNote(cityId, editedNote.id, editedNote.content); // Update content in the global state
        setNotes(updatedNotes); // Update local state with the updated content
      } else {
        console.log("Note index not found.");
      }
      setEditedNote(null);
      setOpenDialogAdd(false);
      setOpenSideModal(false);
      toast.success("Note edited Successfully!");
    }
  };
  const handleDelete = () => {
    if (selectedNote) {
      const cityId = SelectedWeatherData.city.geonameId;
      const noteIndex = SelectedWeatherData.notes.findIndex(
        (note: Note) => note.id === selectedNote.id
      );
      if (noteIndex !== -1) {
        useWeatherStore.getState().removeNote(cityId, selectedNote.id);
      } else {
      }
      setSelectedNote(null);
      setOpenDialog(false);
      setOpenSideModal(false);
      toast.success("Note deleted Successfully!");
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
      {isLoading && <LoaderBackdrop />}
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
            {SelectedWeatherData?.notes.map((note: any, index: any) => (
              <ViewNote
                key={index}
                note={note}
                onView={() => {
                  handleViewNote(note.id, note.text);
                }}
                onDelete={() => {
                  handleDeleteNote(note.id, note.text);
                }}
                onEdit={() => {
                  handleEditNote(note.id, note.text);
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
        disagreeText={"Close"}
      />

      {/* add modal ˝ */}
      <AlertDialogText
        open={openDialogAdd}
        onClose={handleClickCloseAdd}
        onAgree={editedNote ? handleSaveEditedNote : handleAddNote}
        title={editedNote ? "Edit Note" : "New Note"}
        disagreeText={"Cancel"}
        newNote={editedNote ? editedNote.content : newNote}
        setNewNote={(note: string) =>
          editedNote
            ? setEditedNote({ ...editedNote, content: note })
            : setNewNote(note)
        }
        agreeText={editedNote ? "Save Changes" : "Save Note"}
      />
    </>
  );
};

export default Index;
