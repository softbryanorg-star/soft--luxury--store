import React, { useState, useEffect } from 'react'
import D from '../assets/Handbag.jpeg'
import g from '../assets/bag2.jpeg'
import j from '../assets/bag3.jpeg'
import n from '../assets/bag4.jpeg'
import hn from '../assets/watch1.jpeg'
import on from '../assets/watch2.jpeg'
import en from '../assets/watch3.jpeg'
import jo from '../assets/watch4.jpeg'
import Do from '../assets/watch5.jpeg'
import oh from '../assets/Accessories.jpg'
import Dh from '../assets/Cap1.jpeg'
import ga from '../assets/Cap2.jpeg'
import jos from '../assets/Cap3.jpeg'
import i from '../assets/Cap4.jpeg'
import ii from '../assets/snickers1.jpeg'
import iii from '../assets/snickers2.jpeg'
import iiii from '../assets/snickers3.jpeg'
import iiiii from '../assets/snickers4.jpeg'
import iiiiii from '../assets/snickers5.jpeg'
import iiiiiii from '../assets/snickers6.jpeg'
import II from '../assets/snickers7.jpeg'
import iiiiiiii from '../assets/acc1.jpeg'
import a from '../assets/acc2.jpeg'
import bb from '../assets/acc3.jpeg'
import dd from '../assets/acc4.jpeg'
import ee from '../assets/acc5.jpeg'
import ff from '../assets/acc6.jpeg'
import gg from '../assets/acc7.jpeg'
import hh from '../assets/acc8.jpeg'
import I from '../assets/acc9.jpeg'
import J from '../assets/acc10.jpeg'
import './Accessories.css'
import Slider from 'react-slick'
import { useCart } from '../context/CartContext'
import ProductModal from '../Component/ProductModal'
import { Card, CardMedia, CardContent, Button, Snackbar } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { motion } from 'framer-motion'

const Accessories = () => {
  const slides = [D, g, n, j];
  const [current, setCurrent] = useState(0);
  const { cart, addToCart, removeFromCart, getCartTotal } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Automatically rotate slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Add item to global cart (use same shape as Men/Women pages)
  const handleAddToCart = (item) => {
    // Normalize accessories product to { name, price, image }
    const prod = { name: item.name, price: item.price, image: item.img || item.image };
    addToCart(prod);
    setCurrentProduct(prod);
    setOpenSnackbar(true);
  };

  // Calculate total price via context
  const total = getCartTotal();

  // Product groups
  const watches = [
    { img: hn, name: "Rolex Watch 1", price: 200 },
    { img: on, name: "Rolex Watch 2", price: 200 },
    { img: en, name: "Rolex Watch 3", price: 200 },
    { img: jo, name: "Rolex Watch 4", price: 200 },
    { img: Do, name: "Rolex Watch 5", price: 200 },
  ];

  const caps = [
    { img: oh, name: "Cap 1", price: 200 },
    { img: Dh, name: "Cap 2", price: 200 },
    { img: jos, name: "Cap 3", price: 200 }, 
    { img: ga, name: "Cap 4", price: 200 },
    { img: i, name: "Cap 5", price: 200 },
  ];

  const snickers = [
    { img: ii, name: "Sneaker 1", price: 200 },
    { img: iii, name: "Sneaker 2", price: 200 },
    { img: iiii, name: "Sneaker 3", price: 200 },
    { img: iiiii, name: "Sneaker 4", price: 200 },
    { img: iiiiii, name: "Sneaker 5", price: 200 },
    { img: iiiiiii, name: "Sneaker 6", price: 200 },
    { img: II, name: "Sneaker 7", price: 200 },
  ];

  const jewelries = [
    { img: iiiiiiii, name: "Jewelry 1", price: 200 },
    { img: a, name: "Jewelry 2", price: 200 },
    { img: bb, name: "Jewelry 3", price: 200 },
    { img: dd, name: "Jewelry 4", price: 200 },
    { img: ee, name: "Jewelry 5", price: 200 },
    { img: ff, name: "Jewelry 6", price: 200 },
    { img: gg, name: "Jewelry 7", price: 200 },
    { img: hh, name: "Jewelry 8", price: 200 },
    { img: I, name: "Jewelry 9", price: 200 },
    { img: J, name: "Jewelry 10", price: 200 },
  ];

  return (
    <div>
      {/* Header */}
      <div className="acam">
        <h1>Shop on all our luxury accessories</h1>
      </div>

      {/* Slider */}
      <div className="hat">
        <div className="imagen slider">
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`slide-${idx}`}
              className={`slide ${idx === current ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Animated Category Sections (watches, caps, snickers, jewelries) */}
      {[
        { title: 'Rolex Watches', products: watches },
        { title: 'Exclusive Caps', products: caps },
        { title: 'Luxury Sneakers', products: snickers },
        { title: 'Fine Jewelries', products: jewelries },
      ].map((category, idx) => (
        <section className="category-section" key={idx}>
          <h1>{category.title}</h1>

          <Slider
            {...{
              dots: true,
              infinite: true,
              speed: 1400,
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4800,
              arrows: true,
              centerMode: true,
              centerPadding: '40px',
              responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 2, centerPadding: '30px' } },
                { breakpoint: 800, settings: { slidesToShow: 1, centerPadding: '0' } },
              ],
            }}
          >
            {category.products.map((product, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06, y: -6 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Card className="collection-card magical-card">
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.img}
                    alt={product.name}
                    sx={{ objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => { setModalProduct({ ...product, image: product.img }); setModalOpen(true); }}
                  />
                  <CardContent>
                    <h3 style={{ margin: '6px 0' }}>{product.name}</h3>
                    <p style={{ fontWeight: '700', margin: '6px 0' }}>${product.price}</p>
                    <Button
                      variant="contained"
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
        </section>
      ))}

      {/* Floating Cart Summary (uses global cart) */}
      <div className="cart-summary">
        <h3>Your Cart ({cart.length} items)</h3>
        {cart.map((item, idx) => (
          <div key={idx} className="cart-item">
            <img src={item.image || item.img} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', marginRight: 8 }} />
            <span>{item.name}{item.selectedSize ? ` (Size: ${item.selectedSize})` : ''}</span>
            <span style={{ marginLeft: 8 }}>x{item.quantity}</span>
            <span style={{ marginLeft: 8 }}>${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(item.id || item._derivedId)}>Remove</button>
          </div>
        ))}
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>
      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} product={modalProduct} onAdd={(p) => handleAddToCart({ ...p, image: p.image || p.img })} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        message={currentProduct ? `Added ${currentProduct.name} to your cart` : ''}
      />
    </div>
  );
};

export default Accessories;
