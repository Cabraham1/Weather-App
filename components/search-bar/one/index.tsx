import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { SxPropsType } from "../../../types";
import { useState } from "react";

export const SearchBar: React.FC<
  SxPropsType & { sendQuery?: (arg: string) => void }
> = ({ sx, sendQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== "") {
        if (sendQuery) {
          sendQuery(trimmedValue);
          setInputValue("");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <TextField
      id="input-with-icon-textfield"
      size="small"
      placeholder="Search"
      sx={{ display: "inline-block", fontSize: "10px", width: "100%", ...sx }}
      InputProps={{
        sx: {
          borderRadius: "10px",
          height: "38px",
          width: "100%",
          color: "black",
          "&:hover": {
            border: "1px solid #D0D5DD",
          },
        },
        startAdornment: (
          <InputAdornment position="start">
            <Image src="/search.svg" width={16} height={16} alt="Search Icon" />
          </InputAdornment>
        ),
      }}
      value={inputValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};
