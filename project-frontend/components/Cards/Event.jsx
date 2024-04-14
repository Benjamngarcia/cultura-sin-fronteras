import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Rating,
  Box
} from "@mui/material";
import { useRouter } from "next/router";

function EventCard(props) {
  const router = useRouter()
  const { imageUrl, name, startDate, endDate, rating, id } = props;

  const redirectToEvent = (id) => {
    router.push(`/event-details/${id}`);
  }

  return (
    <Box sx={{ backgroundColor: "white", padding: "8px", borderRadius: "8px", maxWidth: "350px"}}>
      <CardActionArea onClick={() =>redirectToEvent(id)}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={`Imagen de ${name}`}
          sx={{ objectFit: "contain", width: "100%" }} // Asegura que la imagen se ajuste completamente
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fecha de inicio: {startDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fecha de fin: {endDate}
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
        </CardContent>
      </CardActionArea>
    </Box>
  );
}

export default EventCard;
