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
import API from '../utils/api';
import usePaystack from "../hooks/usePaystack";
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const { initiatePayment } = usePaystack();

  const [payLoading, setPayLoading] = useState(false);
  const navigate = useNavigate();

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
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setPayLoading(true);

    try {
      const items = cart.map((item) => ({
        productId: item.id, // frontend string ID
        productSnapshot: {
          name: item.name,
          price: item.price,
          image: item.image,
        },
        quantity: item.quantity,
        unitPrice: item.price,
      }));

      const shippingAddress = { ...form };

      const create = await API.post('/api/orders', {
        items,
        shippingAddress,
        totalAmount: total,
      });

      const { orderId } = create.data;

      // Save last order for quick tracking (order confirmation pages can show a "Track Order" button)
      try { localStorage.setItem('lastOrder', JSON.stringify({ orderId, email: form.email || '' })); } catch (e) {}

      const payInit = await initiatePayment(
        orderId,
        form.email || "customer@example.com"
      );

      if (payInit?.authorization_url) {
        window.location.href = payInit.authorization_url;
      } else {
        alert("Payment initiation failed");
        console.error(payInit);
      }
    } catch (err) {
      console.error(err);
      alert("Could not create order or initiate payment");
    } finally {
      setPayLoading(false);
    }
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
          fontWeight: 700,
        }}
      >
        Checkout
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* BILLING FORM */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, background: "#111" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Billing & Shipping
            </Typography>

            <Grid container spacing={2}>
              {["name", "email", "address", "city", "country", "phoneNumber"].map(
                (field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={field.toUpperCase()}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: "gold" } }}
                      sx={{
                        "& input": { color: "gold" },
                        "& fieldset": { borderColor: "gold" },
                      }}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* ORDER SUMMARY */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, background: "whitesmoke" }}>
            <Typography variant="h5" sx={{ mb: 2, color: "gold" }}>
              Order Summary
            </Typography>

            {cart.map((item, i) => (
              <Box
                key={i}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography>${item.price * item.quantity}</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Shipping</Typography>
              <Typography>${shipping}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight="bold">Total</Typography>
              <Typography fontWeight="bold">
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              fullWidth
              sx={{ mt: 3, background: "gold", color: "#000" }}
              onClick={handleCheckout}
              disabled={payLoading}
            >
              {payLoading ? "Processing..." : "Proceed to Payment"}
            </Button>

            <Button
              fullWidth
              sx={{ mt: 1, background: '#111', color: 'gold' }}
              onClick={() => {
                // navigate to tracking page using lastOrder if available
                const last = localStorage.getItem('lastOrder');
                if (last) {
                  const parsed = JSON.parse(last);
                  navigate('/track-order', { state: { orderId: parsed.orderId, email: parsed.email } });
                } else {
                  navigate('/track-order');
                }
              }}
            >
              Track Last Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;