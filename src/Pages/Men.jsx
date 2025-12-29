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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "../Component/ProductModal";
import { Link } from "react-router-dom";

import "./Men.css";

// Hero
import H from "../assets/Mencasual.jpeg";

// Casual Wear
import c1 from "../assets/Mencasual.jpeg";
import c2 from "../assets/Mencasual2.jpeg";
import c3 from "../assets/Mencasual3.jpeg";
import c4 from "../assets/Mencasual4.jpeg";
import c5 from "../assets/Mencasual5.jpeg";

// Streetwear
import s1 from "../assets/Menstreetwear.jpeg";
import s2 from "../assets/Menstreetwear2.jpeg";
import s3 from "../assets/Menstreetwear3.jpeg";
import s4 from "../assets/Menstreetwear4.jpeg";
import s5 from "../assets/Menstreetwear5.jpeg";
import s6 from "../assets/Menstreetwear6.jpeg";
import s7 from "../assets/Menstreetwear7.jpeg";
import s8 from "../assets/Menstreetwear8.jpeg";
import s9 from "../assets/Menstreetwear9.jpeg";
import s10 from "../assets/Menstreetwear10.jpeg";
import s11 from "../assets/Menstreet.jpeg";
import s12 from "../assets/Menstreetwear11.jpeg";

const Men = () => {
  const sliderSettings = {   
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCurrentProduct(product);
    setOpenSnackbar(true);
  };

  const openProduct = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  }

  // MEN CATEGORY DATA
  const MencasualWear = [
    { name: "Urban Breeze Shirt", image: c1, price: 129.99 },
    { name: "Classic Serenity Tee", image: c2, price: 89.99 },
    { name: "Modern Fit Chinos", image: c3, price: 149.99 },
    { name: "Evening Ease Polo", image: c4, price: 79.99 },
    { name: "Signature Casual Set", image: c5, price: 199.99 },
  ];

  const Menstreetwear = [
    { name: "Urban Poetry Jacket", image: s1, price: 199.99 },
    { name: "Rhythm & Flow Set", image: s2, price: 159.99 },
    { name: "Metropolitan Dreams", image: s3, price: 139.99 },
    { name: "Street Symphony", image: s4, price: 189.99 },
    { name: "City Lights Ensemble", image: s5, price: 229.99 },
    { name: "Night Pulse Hoodie", image: s6, price: 199.99 },
    { name: "Metro Edge Tracksuit", image: s7, price: 159.99 },
    { name: "Velocity Street Jacket", image: s8, price: 139.99 },
    { name: "Concrete Rhythm Set", image: s9, price: 189.99 },
    { name: "Urban Crown Ensemble", image: s10, price: 229.99 },
    { name: "Dusk Element Jacket", image: s11, price: 229.99 },
    { name: "Prime Motion Hoodie", image: s12, price: 229.99 },
  ];

  return (
    <>
    <Box className="men-page">
      {/* HERO SECTION */}
      <Box
        className="men-hero"
        sx={{
          backgroundImage: `url(${H})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="men-overlay" />
        <motion.div
          className="men-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="h2" className="men-title">
            Soft Luxury Men
          </Typography>
          <Typography className="men-subtitle">
            Where strength meets elegance, and style speaks without a word.
          </Typography>
          <Link to="/MenCategory" style={{ textDecoration: 'none' }}>
            <Button className="men-button">Explore the Collection</Button>
          </Link>
        </motion.div>
      </Box>

      {/* CATEGORY SECTIONS */}
      {[
        { title: "Men’s Casual Wear", products: MencasualWear },
        { title: "Men’s Streetwear", products: Menstreetwear },
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
          The Essence of Him
        </Typography>
        <Typography className="essence-text">
          He is confidence refined. Power in motion. Silent dominance woven into
          every thread. Soft Luxury Men is crafted for the man who moves with 
          intention — timeless, bold, and unforgettable.
        </Typography>
      </Box>

      {/* CALL TO ACTION */}
      <Box className="cta-section">
        <Typography variant="h5" className="cta-text">
          Elevate Your Presence. Define Your Legacy.
        </Typography>
        <Link to="/MenCategory" style={{ textDecoration: 'none' }}>
          <Button className="cta-button">Shop Men's Collection</Button>
        </Link>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={
          currentProduct ? `Added ${currentProduct.name} to your cart` : ""
        }
      />
    </Box>
    <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} product={modalProduct} onAdd={handleAddToCart} />

    </>
  );
};

export default Men;
