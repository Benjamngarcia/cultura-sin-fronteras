import React, { useState } from "react";
import { Box, Typography, Rating, Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import RoomIcon from "@mui/icons-material/Room";
import EventCard from "@/components/Cards/Event";
import MapaConGoogleMaps from "@/components/common/Map";

export default function EventDetails() {
  const eventDetails = {
    img: "https://source.unsplash.com/345x140/?travel",
    name: "Travel to the Moon",
    scoreAvg: 4.5,
    reviewCount: 150,
    categories: ["Espacio", "Ciencia", "Aventura"],
    dates: "23rd April 2024 - 26th April 2024",
    description:
      "Join us for a spectacular journey to the moon. This once-in-a-lifetime experience...",
    creator: {
      name: "Lunar Adventures",
      eventCount: 5,
    },
    address: {
      street: "Rocket Road",
      number: "1",
      colony: "SpaceX Facility",
      municipality: "Brownsville",
      city: "Boca Chica",
      state: "Texas",
      longitude: -99.1332049,
      latitude: 19.4326018,
    },
    comments: [
      { name: "Alice", rating: 5, comment: "Unbelievable experience!" },
      {
        name: "Bob",
        rating: 4,
        comment: "Absolutely amazing, but a bit pricey.",
      },
      { name: "Alice", rating: 5, comment: "Unbelievable experience!" },
      {
        name: "Bob",
        rating: 4,
        comment: "Absolutely amazing, but a bit pricey.",
      },
      { name: "Alice", rating: 5, comment: "Unbelievable experience!" },
      {
        name: "Bob",
        rating: 4,
        comment: "Absolutely amazing, but a bit pricey.",
      },
      { name: "Alice", rating: 5, comment: "Unbelievable experience!" },
      {
        name: "Bob",
        rating: 4,
        comment: "Absolutely amazing, but a bit pricey.",
      },
    ],
  };

  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Event details
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-end",
        }}
      >
        <Box
          component="img"
          height="200"
          src={eventDetails.img}
          alt={`Image ${eventDetails.name}`}
          sx={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography variant="h5">{eventDetails.name}</Typography>
          <Typography variant="subtitle1">
            Categories: {eventDetails.categories.join(", ")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Rating
              name="half-rating-read"
              value={eventDetails.scoreAvg}
              readOnly
              precision={0.5}
            />
            <Typography variant="body1">
              ({eventDetails.reviewCount})
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingY: "24px" }}>
        <Typography variant="body2">Date: {eventDetails.dates}</Typography>
        <Typography variant="h5" sx={{ marginTop: "16px" }}>
          Description
        </Typography>
        <Typography variant="body1">{eventDetails.description}</Typography>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            width: "fit-content",
          }}
        >
          <Box
            sx={{
              background: "lightgray",
              borderRadius: "50%",
              padding: "6px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Person />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography variant="subtitle1">
              {eventDetails.creator.name}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "gray" }}>
              {eventDetails.creator.eventCount} events created
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ marginTop: "16px" }}>
          Location
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: showMap ? "flex-start" : "center",
            width: "fit-content",
          }}
        >
          <Box
            sx={{
              padding: "6px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RoomIcon />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography variant="subtitle1">{address}</Typography>
            <Button
              variant="text"
              color="primary"
              sx={{ width: "fit-content" }}
              onClick={() => setShowMap(!showMap)}
            >
              Show map
            </Button>
            <Box sx={{ display: showMap ? "block" : "none" }}>
              <MapaConGoogleMaps
                latProp={eventDetails.address.latitude}
                lngProp={eventDetails.address.longitude}
                setAddress={setAddress}
              />
            </Box>
          </Box>
        </Box>
        {/* <Typography variant="body1">
        Coordenadas: Longitud: {eventDetails.address.longitude}, Latitud:{" "}
        {eventDetails.address.latitude}
      </Typography> */}
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            width: "fit-content",
            marginBottom: "16px",
            marginTop: "16px",
          }}
        >
          <Typography variant="h6">User comments</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography variant="h5">{eventDetails.scoreAvg}</Typography>
            <Box>
              <Rating
                name="half-rating-read"
                value={eventDetails.scoreAvg}
                readOnly
                precision={0.5}
              />
              <Typography variant="body1">
                ({eventDetails.reviewCount} comments)
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {eventDetails.comments.map((comment, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                border: "1px solid lightgray",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Person />
                <Typography variant="subtitle1">{comment.name}</Typography>
                <Rating name="read-only" value={comment.rating} readOnly />
              </Box>
              <Typography variant="subtitle2">23 april 2023</Typography>
              <Typography variant="body1">{comment.comment}</Typography>
            </Box>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Highlighted events
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[...Array(10)].map((_, index) => (
            <EventCard
              key={index}
              imageUrl="https://source.unsplash.com/345x140/?travel"
              name="Viaje a la luna"
              startDate="2022-12-12"
              endDate="2022-12-13"
              rating={4}
              id={index} // Asumiendo que el id puede ser el índice en este contexto ficticio
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
