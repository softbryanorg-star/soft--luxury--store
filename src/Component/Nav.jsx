import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Nav = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Women", to: "/Women" },
    { label: "Men", to: "/Men" },
    { label: "About", to: "/About" },
    { label: "Accessories", to: "/Accessories" },
    { label: "Contact", to: "/Contact" },
    { label: "Login", to: "/Login" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#000",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.25)",
          borderBottom: "1px solid rgba(255, 215, 0, 0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            style={{
              textDecoration: "none",
              color: "gold",
              fontFamily: "'Cinzel', serif",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            SOFT LUXURY
          </Typography>

          {/* DESKTOP LINKS */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 3,
            }}
          >
            {navLinks.map((link, i) => (
              <Button
                key={i}
                component={Link}
                to={link.to}
                sx={{
                  color: "gold",
                  fontFamily: "'Poppins', sans-serif",
                  position: "relative",
                  fontSize: "1rem",
                  "&:hover::after": {
                    width: "100%",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "gold",
                    transition: "0.3s ease",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* RIGHT SIDE: CART + HAMBURGER */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           
            {/* CART ICON */}
            <IconButton component={Link} to="/cart" sx={{ color: "gold" }}>
              <Badge
                badgeContent={cartCount}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "gold",
                    color: "#000",
                    fontWeight: "bold",
                    border: "1px solid #000",
                  },
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
              </Badge>
            </IconButton>

            {/* MOBILE MENU ICON */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: "block", md: "none" },
                color: "gold",
              }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ MOBILE GOLD DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: "75%",
            background: "#000",
            color: "gold",
            borderLeft: "1px solid rgba(255, 215, 0, 0.3)",
            boxShadow: "0 0 25px rgba(68, 62, 28, 0.4)",
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid rgba(255, 215, 0, 0.3)",
          }}
        >
          <Typography
            sx={{
              color: "gold",
              fontFamily: "'Cinzel', serif",
              fontSize: "1.3rem",
              fontWeight: "700",
            }}
          >
            MENU
          </Typography>

          <IconButton onClick={toggleDrawer} sx={{ color: "gold" }}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        {/* Drawer Items */}
        <List>
          {navLinks.map((link, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={link.to}
                onClick={toggleDrawer}
                sx={{
                  "&:hover": {
                    background: "rgba(255, 215, 0, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      color: "gold",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Nav;
