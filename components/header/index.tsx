import { Box } from "@mui/material";
import Image from "next/image";
import { SearchBar } from "../search-bar/one";
import { useState } from "react";

const Header: React.FC<{
  small: boolean;
  large: boolean;
  openSmallClick: () => void;
  openLargeClick: () => void;
}> = ({ small, large, openSmallClick, openLargeClick }) => {

  const [searchResults, setSearchResults] = useState("");

  const searchQuery = (query: string) => {
    // Update search results
    // setSearchResults(query as string);
    
  };

  console.log('Search results:', searchResults);

  return (
    <Box
      sx={{
        height: "90px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        ...(large && { marginLeft: { xs: "0px", md: "300px" } }),
        zIndex: 1000,
      }}
    >
      <Box
        onClick={openLargeClick}
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          ...(large == false
            ? { display: { xs: "none", md: "block" } }
            : { display: "none" }),
          paddingLeft: "25px",
        }}
      >
        <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
      </Box>
      <Box
        onClick={openSmallClick}
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          ...(small == false
            ? { display: { xs: "block", md: "none" } }
            : { display: "none" }),
          paddingLeft: "20px",
        }}
      >
        <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
      </Box>
      <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <SearchBar
            sendQuery={(data: string) => searchQuery && searchQuery(data)}
          />

          <Box sx={{ marginRight: "40px" }}>
            <Image alt="bell" width={24} height={24} src="/bell.svg" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
