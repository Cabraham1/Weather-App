import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, InputLabel, TextField, Typography } from "@mui/material";

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onAgree?: () => void;
  title: string;
  content: string;
  disagreeText?: string;
  agreeText?: string;
  deleteColor?: boolean;
}
interface AlertDialogTextProps {
  open: boolean;
  onClose: () => void;
  onAgree: (description: string) => void;
  title: string;
  disagreeText: string;
  agreeText: string;
}

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
              color: "black",
              mb: { xs: "5px", sm: "0px" },
              wordBreak: "break-all",
              textTransform: "capitalize",
            }}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
}) => {
  const [description, setDescription] = React.useState("");

  const handleAgree = () => {
    if (onAgree) {
      onAgree(description);
      console.log(description)
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
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
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
