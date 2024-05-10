import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { PeopleAlt, Delete } from "@mui/icons-material";
import { CityCardProps } from "../../types";



const CityCard: React.FC<CityCardProps> = ({
  dislikeIconSrc,
  likeIconSrc,
  weatherIconSrc,
  cityName,
  isLiked,
  temperature,
  weatherDescription,
  population,
  onLikeClick,
  onDeleteClick,
  onViewClick,
}) => {
  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          width: "200px",
          px: "1rem",
          py: "1rem",
          borderRadius: "10px",
          bgcolor: "white",
          gap: ".5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            width: "100%",
          }}
        >
          {isLiked ? (
            <Image
              src={likeIconSrc}
              alt="like"
              width={30}
              height={30}
              onClick={onLikeClick}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <Image
              src={dislikeIconSrc}
              alt="dislike"
              width={30}
              height={30}
              onClick={onLikeClick}
              style={{ cursor: "pointer" }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image
            src={weatherIconSrc}
            alt="weather"
            width={50}
            height={50}
            onClick={onViewClick}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: "1.3rem",
            }}
          >
            {cityName}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: "1.3rem",
              color: "red",
            }}
          >
            {temperature}°C
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            textAlign: "start",
            textTransform: "capitalize",
            fontSize: ".8rem",
            color: "#929C21",
          }}
        >
          {weatherDescription}
        </Typography>
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
          }}
        >
          <PeopleAlt color="primary" />
          <Typography
            sx={{
              textAlign: "start",
              textTransform: "capitalize",
              fontSize: ".8rem",
            }}
          >
            {population}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            bgcolor: "black",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "1rem",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "10px",
              bgcolor: "#F0F2F5",
              color: "black",
            }}
            onClick={onViewClick}
          >
            View
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "10px",
              bgcolor: "#F0F2F5",
              color: "black",
            }}
            onClick={onDeleteClick}
          >
            <Delete />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CityCard;
