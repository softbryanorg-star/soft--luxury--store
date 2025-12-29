import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        background: "#0a0a0a",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "gold",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontFamily: "'Cinzel', serif",
          marginBottom: "40px",
          fontWeight: "700",
          letterSpacing: "2px",
        }}
      >
        Checkout
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* LEFT SIDE — BILLING FORM */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              background: "#111",
              border: "1px solid rgba(255,215,0,0.3)",
              boxShadow: "0 0 20px rgba(255,215,0,0.15)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Cinzel', serif",
                marginBottom: "20px",
                color: "gold",
              }}
            >
              Billing & Shipping Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: "gold" } }}
                  sx={{
                    "& input": { color: "gold" },
                    "& fieldset": { borderColor: "gold" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: "gold" } }}
                  sx={{
                    "& input": { color: "gold" },
                    "& fieldset": { borderColor: "gold" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: "gold" } }}
                  sx={{
                    "& input": { color: "gold" },
                    "& fieldset": { borderColor: "gold" },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: "gold" } }}
                  sx={{
                    "& input": { color: "gold" },
                    "& fieldset": { borderColor: "gold" },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: "gold" } }}
                  sx={{
                    "& input": { color: "gold" },
                    "& fieldset": { borderColor: "gold" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: "gold" } }}
                  sx={{
                    "& input": { color: "gold" },
                    "& fieldset": { borderColor: "gold" },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              background: "whitesmoke",
              border: "1px solid rgba(255,215,0,0.3)",
              boxShadow: "0 0 20px rgba(255,215,0,0.15)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Cinzel', serif",
                marginBottom: "20px",
                color: "gold",
              }}
            >
              Order Summary
            </Typography>

            {cart.length === 0 ? (
              <Typography sx={{ color: "gold", opacity: 0.7 }}>
                Your cart is empty.
              </Typography>
            ) : (
              <>
                {cart.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <Typography>{item.name} x {item.quantity}</Typography>
                    <Typography>${item.price * item.quantity}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2, borderColor: "rgba(255,215,0,0.3)" }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                    mb: 2,
                  }}
                >
                  <Typography>Shipping:</Typography>
                  <Typography>${shipping}</Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: "rgba(255,215,0,0.3)" }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Total:
                  </Typography>
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  sx={{
                    background: "gold",
                    color: "#000",
                    mt: 3,
                    fontWeight: "bold",
                    px: 3,
                    py: 1.5,
                    borderRadius: "8px",
                    "&:hover": {
                      background: "#fff",
                    },
                  }}
                >
                  Proceed to Payment
                </Button>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
