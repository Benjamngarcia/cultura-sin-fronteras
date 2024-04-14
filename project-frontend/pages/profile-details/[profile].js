// pages/profile-details/[id].js

import React from "react";
import { useRouter } from "next/router";
import { Typography, Box, Container } from "@mui/material";
import { allUsers } from "@/data";

export default function ProfileDetails() {
  const router = useRouter();
  const { profile } = router.query;
  console.log(router.query)

  const user = allUsers.find((user) => user.id === parseInt(profile));

  if (!user) {
    return <Typography>User not found.</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, padding: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile Details
        </Typography>
        <Typography variant="body1">
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography variant="body1">
          <strong>First Name:</strong> {user.firstName}
        </Typography>
        <Typography variant="body1">
          <strong>Last Name:</strong> {user.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        {/* Do not display password in production */}
        <Typography variant="body1">
          <strong>Password:</strong> {user.password}
        </Typography>
      </Box>
    </Container>
  );
}
