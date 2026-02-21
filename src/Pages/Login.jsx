
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { setAuth } from '../utils/auth';
import { useNavigate, useLocation }from 'react-router-dom';
import { useCart } from '../context/CartContext'

import { CircularProgress } from "@mui/material";

const Login = () => {
    const navigate =useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState("")
  const API_BASE = import.meta.env.VITE_BASE_URL || '';
  const location = useLocation()
  const { addToCart } = useCart()

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    let payload=  {email,password}
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, payload);
      const { token, user } = response.data;
      // persist auth info via helper (also sets axios header)
      if (token) setAuth(token, user);

      // After login: if there is a pendingCartItem, restore it to the global cart
      try {
        const pendingRaw = localStorage.getItem('pendingCartItem')
        if (pendingRaw) {
          const pending = JSON.parse(pendingRaw)
          if (pending) {
            addToCart(pending) // call existing cart logic
            localStorage.removeItem('pendingCartItem')
          }
        }
      } catch (e) {
        // ignore parse errors
      }

      // Role-based redirect: admins -> /admin
      if (user?.role === 'admin') {
        navigate('/admin')
        return
      }

      // redirect to the place that initiated login (if provided) or to /cart
      const redirectTo = location.state?.redirectTo || '/cart'
      navigate(redirectTo)
    } catch (err) {
      // Handle login error
      console.error("Login failed:", err);
      setError(err?.response?.data?.error || "Login failed")
    } finally{
        setLoading(false)
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #000000, #0a0a0a)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        marginLeft: "auto",
        marginRight: "auto",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, sm: 5 },
            width: { xs: "90%", sm: 400 },
            borderRadius: "20px",
            textAlign: "center",
            background: "#ffffff",
            backdropFilter: "none",
            boxShadow: "0 8px 30px rgba(2,6,23,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Lock Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(90deg, #d4af37, #b8860b)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              mb: 2,
              boxShadow: "0 6px 24px rgba(212,175,55,0.18)",
            }}
          >
            <LockOutlined sx={{ fontSize: 40, color: "#111" }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: "#d4af37" }}
          >
            {!error ? 'Welcome Back': error }
          </Typography>

          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': { borderRadius: '12px' },
              '& .MuiInputBase-root': { color: '#111', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': { borderRadius: '12px' },
              '& .MuiInputBase-root': { color: '#111', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              py: 1.4,
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #d4af37, #b8860b)",
              color: '#000',
              boxShadow: "0 8px 30px rgba(212,175,55,0.18)",
              "&:hover": {
                background: "linear-gradient(90deg, #b8860b, #d4af37)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> :"Login"}
          </Button>

          {/* Footer Text */}
          <Typography
            variant="body2"
            sx={{ mt: 3, color: "#ddd", textAlign: "center" }}
          >
            Don’t have an account?{" "}
            <a
              href="/register"
              style={{
                color: "#d4af37",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign up
            </a>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
