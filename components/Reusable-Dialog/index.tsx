import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import Image from "next/image";
import SideModalCard from "../home-banner/SideModalCard";
import { getFormattedDate } from "../../utils/functions";
import { AlertDialogProps, AlertDialogTextProps, WeatherModalProps } from "../../types";

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  onAgree,
  title,
  content,
  disagreeText,
  agreeText,
  deleteColor,
}) => {
  const handleAgree = () => {
    if (onAgree) {
      onAgree();
    }
    onClose(); // Close the modal after triggering the agreed action
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ zIndex: 10000 }}
    >
      <Box
        sx={{
          py: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "",
              mb: { xs: "5px", sm: "0px" },
              wordBreak: "break-all",
              textTransform: "capitalize",
            }}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: { xs: "600px", sm: "621px" },
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                textAlign: "center",
                color: "black",
                mb: { xs: "5px", sm: "0px" },
              }}
            >
              {content}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              borderRadius: "1rem",
              textTransform: "capitalize",
              backgroundColor: "black",
              color: "white",
              px: "20px",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            {disagreeText}
          </Button>

          {agreeText && (
            <Button
              onClick={handleAgree}
              autoFocus
              sx={{
                borderRadius: "1rem",
                textTransform: "capitalize",
                backgroundColor: deleteColor ? "#FF0000" : "#4F46E5",
                color: "white",
                px: "20px",
                "&:hover": {
                  backgroundColor: deleteColor ? "#FF0000" : "#4F46E5",
                },
              }}
            >
              {agreeText}
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export const AlertDialogText: React.FC<AlertDialogTextProps> = ({
  open,
  onClose,
  onAgree,
  disagreeText,
  agreeText,
  newNote,
  setNewNote,
}) => {
  const handleAgree = () => {
    if (onAgree) {
      onAgree(newNote);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ zIndex: 10000 }}
      maxWidth="lg"
    >
      <Box
        sx={{
          px: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: { xs: "600px", sm: "621px" },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form>
              <InputLabel sx={{ marginBottom: "14px" }}>Add Note</InputLabel>
              <TextField
                multiline
                rows={6}
                sx={{ width: "600px", marginBottom: "5px" }}
                id="outlined-basic"
                label="Write in here..."
                variant="outlined"
                value={newNote}
                required
                onChange={(e) => setNewNote(e.target.value)}
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              borderRadius: "1rem",
              textTransform: "capitalize",
              backgroundColor: "black",
              color: "white",
              px: "20px",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            {disagreeText}
          </Button>

          <Button
            onClick={handleAgree}
            autoFocus
            sx={{
              borderRadius: "1rem",
              textTransform: "capitalize",
              backgroundColor: "#4F46E5",
              color: "white",
              px: "20px",
              "&:hover": {
                backgroundColor: "#4F46E5",
              },
            }}
          >
            {agreeText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export const WeatherModal: React.FC<WeatherModalProps> = ({
  open,
  onClose,
  disagreeText,
  title,
  weatherLogo,
  tempDegree,
  humidityDegree,
  windDegree,
  location,
  isError,
}) => {
  const formattedDate = getFormattedDate();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ zIndex: 10000 }}
      maxWidth="lg"
    >
      <Box
        sx={{
          px: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: { xs: "100%", sm: "100%" },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "black",
              mb: { xs: "5px", sm: "0px" },
              wordBreak: "break-all",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isError == false ? (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: 600,
                    color: "Blue",
                    textAlign: "center",
                    mb: { xs: "5px", sm: "0px" },
                    wordBreak: "break-all",
                    textTransform: "capitalize",
                  }}
                >
                  {location}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: ".75rem",
                    color: "gray",
                    textAlign: "center",
                    wordBreak: "break-all",
                    textTransform: "capitalize",
                  }}
                >
                  {formattedDate}
                </Typography>
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
                      src={weatherLogo}
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
                        color: "black",
                      }}
                    >
                      {tempDegree}°C
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
                      {formattedDate}
                    </Typography>
                  </Box>

                  <Box>
                    <SideModalCard
                      humidityDegree={`${humidityDegree}%`}
                      windDegree={`${windDegree} m/s`}
                      isRow={true}
                    />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "red",
                  textAlign: "center",
                  mb: { xs: "5px", sm: "0px" },
                  wordBreak: "break-all",
                  textTransform: "capitalize",
                }}
              >
                No observation found for this location
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              borderRadius: "1rem",
              textTransform: "capitalize",
              backgroundColor: "black",
              color: "white",
              px: "20px",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            {disagreeText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
