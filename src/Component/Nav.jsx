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
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../utils/api";
import { isAuthenticated, clearAuth, getUser } from "../utils/auth";

const Nav = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  const navigate = useNavigate();
  const user = getUser();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Women", to: "/women" },
    { label: "Men", to: "/men" },
    { label: "Track Order", to: "/track-order" },
    { label: "Accessories", to: "/accessories" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,215,0,0.25)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: 80 }}>
          {/* BRAND */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "gold",
              fontFamily: "'Cinzel', serif",
              fontSize: "1.4rem",
              letterSpacing: "3px",
              transition: "0.3s ease",
              "&:hover": {
                opacity: 0.85,
                letterSpacing: "4px",
              },
            }}
          >
            SOFT LUXURY
          </Typography>

          {/* DESKTOP NAV */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  color: "gold",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.95rem",
                  position: "relative",
                  textTransform: "none",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    left: 0,
                    bottom: -4,
                    backgroundColor: "gold",
                    transition: "0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* CART */}
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Shopping cart"
              sx={{ color: "gold" }}
            >
              <Badge
                badgeContent={cartCount}
                invisible={cartCount === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "gold",
                    color: "#000",
                    fontWeight: 700,
                  },
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 28 }} />
              </Badge>
            </IconButton>

            {/* AUTH */}
            {isAuthenticated() ? (
              <Button
                onClick={async () => {
                  try {
                    await axios.post("/api/auth/logout");
                  } catch {}
                  clearAuth();
                  navigate("/");
                }}
                sx={{
                  color: "gold",
                  textTransform: "none",
                  fontSize: "0.9rem",
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "gold",
                  textTransform: "none",
                  fontSize: "0.9rem",
                }}
              >
                Login
              </Button>
            )}

            {/* MOBILE TOGGLE */}
            <IconButton
              onClick={toggleDrawer}
              aria-label="Open menu"
              sx={{ display: { xs: "flex", md: "none" }, color: "gold" }}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            background: "#000",
            color: "gold",
            width: "75%",
            borderLeft: "1px solid rgba(255,215,0,0.25)",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: "'Cinzel', serif", letterSpacing: 2 }}>
            MENU
          </Typography>
          <IconButton onClick={toggleDrawer} sx={{ color: "gold" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,215,0,0.25)" }} />

        <List>
          {[...navLinks,
            ...(user?.role === "admin" ? [{ label: "Admin", to: "/admin" }] : []),
          ].map((link) => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton
                component={Link}
                to={link.to}
                onClick={toggleDrawer}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.1rem",
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