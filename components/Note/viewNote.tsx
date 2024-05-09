import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { truncateText } from "../../utils/functions";

interface Note {
  id: number;
  text: string;
}

interface ViewNoteProps {
  note: Note;
  onView: (noteId: number, content: string) => void;
  onDelete: (noteId: number, content: string) => void;
  onEdit: (noteId: number, content: string) => void;
}

const ViewNote: React.FC<ViewNoteProps> = ({
  note,
  onView,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          borderBottom: "1px solid gray",
          py: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              fontSize: "12px",
              maxWidth: "30rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "capitalize",
            }}
          >
            {truncateText(note?.text, 50)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4C133F",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "#4C133F",
              },
            }}
            onClick={() => {
              onView(note.id, note.text);
            }}
          >
            View
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4C133F",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "#4C133F",
              },
            }}
            onClick={() => {
              onEdit(note.id, note.text);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "white",
                color: "red",
              },
            }}
            onClick={() => {
              onDelete(note.id, note.text);
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ViewNote;
