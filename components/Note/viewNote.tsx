import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { truncateText } from "../../utils/functions";

interface Note {
  id: number;
  content: string;
}

interface ViewNoteProps {
  note: Note;
  onView: (noteId: number, content: string) => void;
  onDelete: (noteId: number, content: string) => void;
}

const ViewNote: React.FC<ViewNoteProps> = ({ note, onView, onDelete }) => {
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
            {truncateText(note.content, 50)}
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
              onView(note.id, note.content);
            }}
          >
            View
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
              onDelete(note.id, note.content);
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
