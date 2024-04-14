import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  TextField,
} from "@mui/material";
import { Search, Person } from "@mui/icons-material";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import Close from "@mui/icons-material/Close";
import Link from "next/link";
import LoginModal from "../auth/LoginModal";
export function Nav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de login
  const navItems = [{ title: "Home", link: "/" }];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLoginModalToggle = () => {
    setLoginModalOpen((prevOpen) => !prevOpen); // Cambia el estado del modal de login
  };

  const drawer = (
    <Box sx={{ margin: "8px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 4px",
        }}
      >
        <Link
          href="/"
          className="links-styles"
          alt="Link para regresar a la página inicial del portafolio"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              Dictamigos
            </Typography>
          </Box>
        </Link>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.title}
            sx={{
              borderRadius: "8px",
              transition: ".3s",
              "&:hover": { backgroundColor: "#EBEBEE" },
            }}
          >
            <Link
              href={item.link}
              className="links-styles"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
              }}
            >
              {item.icon}
              <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          position: "static",
          padding: "16px 0px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          alt="Link to return to the main page with all events"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              Cultura sin fronteras
            </Typography>
          </Box>
        </Link>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            placeholder="Search my next travel..."
            variant="outlined"
            InputProps={{
              endAdornment: <Search />,
            }}
          />
          <IconButton onClick={handleLoginModalToggle}> {/* Abre el modal de login al hacer clic */}
            <Person />
          </IconButton>
        </Box>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <WidgetsOutlinedIcon />
        </IconButton>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="top"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          transitionDuration={500}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              borderRadius: "0 0 8px 8px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Renderiza el modal de login */}
      <LoginModal open={loginModalOpen} onClose={handleLoginModalToggle} />
    </>
  );
}
