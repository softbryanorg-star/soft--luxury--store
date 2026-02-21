import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { setAuth } from '../utils/auth';
import { motion } from "framer-motion";
import {useState} from "react";
import { useNavigate,Link } from "react-router-dom";

const RegistrationScreen = () => {
    const navigate= useNavigate()
    const [email, setEmail] =useState("");
    const [password,setPassword]= useState("");
    const [firstName,setFirstName]= useState("")
    const [lastName,setLastName]= useState("")
    const [phoneNumber,setPhoneNumber]= useState("")
    const [address,setAddress]= useState("")
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const formData={ firstName, lastName,email, phoneNumber,password, address, } 
    const API_BASE =  import.meta.env.VITE_BASE_URL || '';
    const Register= async (event) => {
        event.preventDefault()
        setLoading(true)
        try{
          const response = await axios.post(`${API_BASE}/api/auth/register`, formData)
             const { token, user } = response.data;
             // persist auth info via helper
             if (token) setAuth(token, user);
             // role-based redirect
             if (user?.role === 'admin') navigate('/admin');
             else navigate('/');
        } catch (err){
            console.error(err)
            setError(err?.response?.data?.error || 'Registration failed')
        } finally {
            setLoading(false)
        } 
    }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #000000, #0a0a0a)",
        p:13,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 4,
            width: { xs: "90vw", sm: 420 },
            borderRadius: "20px",
            background: "#ffffff",
            backdropFilter: "none",
            boxShadow: "0 8px 25px rgba(2,6,23,0.06)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: "#d4af37", textAlign: "center" }}
          >
            {error ? error:("Create Account")}
          </Typography>

          <form onSubmit={Register}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              sx={{ mb: 2, '& .MuiInputBase-root': { color: '#111', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' } }}
              required
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
               value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
               value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{ mb: 2, '& .MuiInputBase-root': { color: '#111', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' } }}
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
               value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
               value={address}
              onChange={(event) => setAddress(event.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
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
              {loading ? (<CircularProgress size={24} color="inherit" />):("Register")}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center", color: '#ddd' }}>
            Already have an account? {" "}
            <Link to ="/Login"
              style={{
                color: "#d4af37",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
             Login
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default RegistrationScreen;
