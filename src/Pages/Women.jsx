import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
} from "@mui/material";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "../Component/ProductModal";
import { Link } from "react-router-dom";

import "./Women.css";

// Hero
import H from "../assets/women.jpeg";

// Casual Wear
import c1 from "../assets/casual1.jpeg";
import c2 from "../assets/casual2.jpeg";
import c3 from "../assets/casual3.jpeg";
import c4 from "../assets/casual4.jpeg";
import c5 from "../assets/casual5.jpeg";

// Streetwear
import s1 from "../assets/streetwear1.jpeg";
import s2 from "../assets/streetwear2.jpeg";
import s3 from "../assets/streetwear3.jpeg";
import s4 from "../assets/streetwear4.jpeg";
import s5 from "../assets/streetwear5.jpeg";

// Gowns & Ankara
import g1 from "../assets/Gown1.jpeg";
import g2 from "../assets/Gown2.jpeg";
import g3 from "../assets/Gown3.jpeg";
import g4 from "../assets/Gown4.jpeg";
import g5 from "../assets/Gown5.jpg";
const heroBackground = H;

const Women = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: false,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false
        }
      },
    ],
  };

  const { addToCart } = useCart();
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const handleAddToCart = (product) => {
    if (!isAuthenticated()) {
      try { localStorage.setItem('pendingCartItem', JSON.stringify(product)) } catch (e) {}
      navigate('/Login', { state: { redirectTo: '/cart' } })
      return
    }
    addToCart(product);
    setCurrentProduct(product);
    setOpenSnackbar(true);
    navigate('/cart')
  };

  const openProduct = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  }

  // Individual category data (simplified)
  const casualWear = [
  { name: "Summer Breeze Dress", image: c1, price: 129.99 },
  { name: "Serenity Blouse", image: c2, price: 89.99 },
  { name: "Tranquility Pants", image: c3, price: 149.99 },
  { name: "Dawn's Embrace Top", image: c4, price: 79.99 },
  { name: "Twilight Comfort Set", image: c5, price: 199.99 },
];

const streetwear = [
  { name: "Urban Poetry Jacket", image: s1, price: 199.99 },
  { name: "Rhythm & Flow Set", image: s2, price: 159.99 },
  { name: "Metropolitan Dreams", image: s3, price: 139.99 },
  { name: "Street Symphony", image: s4, price: 189.99 },
  { name: "City Lights Ensemble", image: s5, price: 229.99 },
];

const gowns = [
  { name: "Heritage Dream", image: g1, price: 299.99 },
  { name: "Royal Essence", image: g2, price: 349.99 },
  { name: "Legacy's Embrace", image: g3, price: 399.99 },
  { name: "Cultural Canvas", image: g4, price: 329.99 },
  { name: "Timeless Tale", image: g5, price: 449.99 },
];

  return (
    <Box className="women-page">
      {/* HERO SECTION */}
      <Box
        className="women-hero"
        sx={{
          backgroundImage: `url(${H})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="women-overlay" />
        <motion.div
          className="women-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="h2" className="women-title">
            Soft Luxury Women
          </Typography>
          <Typography className="women-subtitle">
            Where elegance is born of courage, and beauty speaks in silence.
          </Typography>
          <Link to="/WomenCategory" style={{ textDecoration: 'none' }}>
            <Button className="women-button">Discover the Collection</Button>
          </Link>
        </motion.div>
      </Box>

      {/* CATEGORY SECTIONS */}
      {[
        { title: "Casual Wear", products: casualWear },
        { title: "Streetwear", products: streetwear },
        { title: "Gowns & Ankara", products: gowns },
      ].map((category, index) => (
        <Box key={index} className="category-section">
          <Typography variant="h4" className="section-title">
            {category.title}
          </Typography>

          <Slider {...sliderSettings}>
            {category.products.map((product, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="collection-card">
                  <CardMedia
                    component="img"
                    height="360"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: "cover", cursor: 'pointer' }}
                    onClick={() => openProduct(product)}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Slider>
        </Box>
      ))}

      {/* ESSENCE SECTION */}
      <Box className="essence-section">
        <Typography variant="h4" className="section-title">
          The Essence of Her
        </Typography>
        <Typography className="essence-text">
          She is grace in motion. Fire in silk. A whisper of power wrapped in gold.
          Every stitch of Soft Luxury is an ode to her becoming — timeless, fearless, divine.
        </Typography>
      </Box>

      {/* CALL TO ACTION */}
      <Box className="cta-section">
        <Typography variant="h5" className="cta-text">
          Step Into the Light of Soft Luxury.
        </Typography>
        <Link to="/WomenCategory" style={{ textDecoration: 'none' }}>
          <Button className="cta-button">Shop the Collection</Button>
        </Link>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={currentProduct ? `Added ${currentProduct.name} to your cart` : ""}
      />
      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} product={modalProduct} onAdd={handleAddToCart} />
    </Box>
  );
};

export default Women;
