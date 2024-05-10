import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Index = () => {
  const path = usePathname();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        gap: "20px",
      }}
    >
      <Box>
        <Image
          src="/nocontentbackup.svg"
          alt="Empty"
          width={1200}
          height={500}
        />
      </Box>
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "black",
            mb: { xs: "5px", sm: "0px" },
            wordBreak: "break-all",
          }}
        >
          {path === "/favorite"
            ? "You have not added your favourite cities Yet!"
            : "No content available"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;
