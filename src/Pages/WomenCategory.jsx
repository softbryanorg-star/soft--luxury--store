import React, { useState } from 'react'
import { Box, Button, Card, CardMedia, CardContent, Typography, Snackbar } from '@mui/material'
import { motion } from 'framer-motion'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import ProductModal from '../Component/ProductModal'
import './WomenCategory.css'

// Ankara images
import ankara1 from '../assets/Ankara1.jpeg'
import ankara2 from '../assets/Ankara2.jpeg'
import ankara3 from '../assets/Ankara3.jpeg'
import ankara4 from '../assets/Ankara4.jpeg'
import ankara5 from '../assets/Ankara5.jpeg'
import ankara6 from '../assets/Ankara6.jpeg'

// Hanging Tops images
import hanging1 from '../assets/hanging1.jpeg'
import hanging2 from '../assets/hanging2.jpeg'
import hanging3 from '../assets/hanging3.jpeg'
import hanging4 from '../assets/hanging4.jpeg'
import hanging5 from '../assets/hanging5.jpeg'
import hanging6 from '../assets/hanging6.jpeg'

// Women Sweater images
import sweater1 from '../assets/WomenSweater1.jpeg'
import sweater2 from '../assets/WomenSweater2.jpeg'
import sweater3 from '../assets/WomenSweater3.jpeg'
import sweater4 from '../assets/WomenSweater4.jpeg'
import sweater5 from '../assets/WomenSweater5.jpeg'
import sweater6 from '../assets/WomenSweater6.jpeg'
import sweater7 from '../assets/WomenSweater8.jpeg'
import sweater8 from '../assets/WomenSweater9.jpeg'

// Women Jeans images
import jeans1 from '../assets/WomenJean1.jpeg'
import jeans2 from '../assets/Womenjean2.jpeg'
import jeans3 from '../assets/Womenjean3.jpeg'

const WomenCategory = () => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ankara')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const ankaraProducts = [
    { id: 1, name: 'Heritage Ankara Dress', image: ankara1, price: 149.99, description: 'Timeless ankara print dress with traditional patterns and modern silhouette.' },
    { id: 2, name: 'Royal Ankara Wrap', image: ankara2, price: 159.99, description: 'Elegant wrap style ankara piece perfect for special occasions and celebrations.' },
    { id: 3, name: 'Ankara Blouse Elegance', image: ankara3, price: 129.99, description: 'Stunning ankara blouse with intricate patterns and comfortable fit.' },
    { id: 4, name: 'Cultural Ankara Gown', image: ankara4, price: 199.99, description: 'Exquisite ankara gown featuring bold colors and traditional African designs.' },
    { id: 5, name: 'Ankara Ensemble Set', image: ankara5, price: 179.99, description: 'Complete ankara outfit set combining top and matching wrapper.' },
    { id: 6, name: 'Premium Ankara Piece', image: ankara6, price: 189.99, description: 'High-quality ankara fabric crafted into a stunning wearable art piece.' },
  ]

  const hangingTopProducts = [
    { id: 7, name: 'Flowing Hanging Top', image: hanging1, price: 89.99, description: 'Lightweight hanging top with elegant drape and breathable fabric.' },
    { id: 8, name: 'Casual Hanging Blouse', image: hanging2, price: 79.99, description: 'Perfect everyday hanging top that combines comfort and style.' },
    { id: 9, name: 'Elegant Hanging Shirt', image: hanging3, price: 94.99, description: 'Sophisticated hanging top ideal for casual outings and relaxed settings.' },
    { id: 10, name: 'Premium Hanging Top', image: hanging4, price: 99.99, description: 'Luxury hanging top in finest materials with seamless finish.' },
    { id: 11, name: 'Chic Hanging Piece', image: hanging5, price: 84.99, description: 'Stylish hanging top featuring modern cut and comfortable fit.' },
    { id: 12, name: 'Designer Hanging Top', image: hanging6, price: 109.99, description: 'Exclusive designer hanging top with unique pattern and premium quality.' },
  ]

  const sweaterProducts = [
    { id: 13, name: 'Cozy Women Sweater', image: sweater1, price: 119.99, description: 'Soft and warm women sweater perfect for cold seasons and layering.' },
    { id: 14, name: 'Elegant Sweater Dress', image: sweater2, price: 134.99, description: 'Sweater dress that can be worn casually or dressed up for events.' },
    { id: 15, name: 'Luxury Cashmere Sweater', image: sweater3, price: 189.99, description: 'Premium cashmere sweater offering ultimate comfort and elegance.' },
    { id: 16, name: 'Trendy Women Sweater', image: sweater4, price: 124.99, description: 'Modern sweater with contemporary design and impeccable craftsmanship.' },
    { id: 17, name: 'Classic Crew Sweater', image: sweater5, price: 114.99, description: 'Timeless crew neck sweater that goes with everything in your wardrobe.' },
    { id: 18, name: 'Oversized Sweater', image: sweater6, price: 129.99, description: 'Comfortable oversized sweater for that relaxed, effortless look.' },
    { id: 19, name: 'Sophisticated Knit', image: sweater7, price: 144.99, description: 'Sophisticated knit sweater showcasing fine craftsmanship and attention to detail.' },
    { id: 20, name: 'Contemporary Knit', image: sweater8, price: 149.99, description: 'Contemporary knit featuring modern textures and elevated comfort.' },
  ]

  const jeansProducts = [
    { id: 21, name: 'Classic Women Jeans', image: jeans1, price: 99.99, description: 'Timeless classic jeans that fit perfectly and last forever.' },
    { id: 22, name: 'Slim Fit Jeans', image: jeans2, price: 109.99, description: 'Elegant slim fit jeans flattering on all body types.' },
    { id: 23, name: 'Premium Denim Jeans', image: jeans3, price: 129.99, description: 'High-quality premium denim jeans with superior durability.' },
  ]

  const handleAddToCart = (product) => {
    if (!isAuthenticated()) {
      try { localStorage.setItem('pendingCartItem', JSON.stringify(product)) } catch (e) {}
      navigate('/Login', { state: { redirectTo: '/cart' } })
      return
    }
    addToCart(product)
    setCurrentProduct(product)
    setOpenSnackbar(true)
    navigate('/cart')
  }

  const openProduct = (product) => {
    setModalProduct(product)
    setModalOpen(true)
  }

  const renderTabContent = () => {
    let products = []
    switch (activeTab) {
      case 'ankara':
        products = ankaraProducts
        break
      case 'hanging':
        products = hangingTopProducts
        break
      case 'sweater':
        products = sweaterProducts
        break
      case 'jeans':
        products = jeansProducts
        break
      default:
        products = ankaraProducts
    }

    return (
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="tab-content"
      >
        <div className={`products-grid grid-${activeTab === 'jeans' ? 'single' : 'standard'}`}>
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="product-wrapper"
            >
              <Card className="product-card">
                <CardMedia
                  component="img"
                  height="320"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => openProduct(product)}
                />
                <CardContent>
                  <Typography variant="h6" className="product-name">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="product-desc" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <Box className="women-category-page">
      {/* Animated Header */}
      <motion.div
        className="category-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="header-text"
          animate={{ x: [0, 20, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <h1>WELCOME TO WOMEN CATEGORY</h1>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {/* Desktop/tab buttons */}
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'ankara' ? 'active' : ''}`}
            onClick={() => setActiveTab('ankara')}
          >
            Ankara
          </button>
          <button
            className={`tab-btn ${activeTab === 'hanging' ? 'active' : ''}`}
            onClick={() => setActiveTab('hanging')}
          >
            Hanging Tops
          </button>
          <button
            className={`tab-btn ${activeTab === 'sweater' ? 'active' : ''}`}
            onClick={() => setActiveTab('sweater')}
          >
            Women Sweater
          </button>
          <button
            className={`tab-btn ${activeTab === 'jeans' ? 'active' : ''}`}
            onClick={() => setActiveTab('jeans')}
          >
            Women Jeans
          </button>
        </div>

        {/* Mobile custom dropdown */}
        <div className="tab-mobile">
          <div className="tab-left">Category</div>
          <div className="tab-select-wrap">
            <button
              className="tab-select"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-expanded={mobileMenuOpen}
            >
              {activeTab === 'ankara' ? 'Ankara' : activeTab === 'hanging' ? 'Hanging Tops' : activeTab === 'sweater' ? 'Women Sweater' : 'Women Jeans'}
              <span className={`chev ${mobileMenuOpen ? 'open' : ''}`}>▾</span>
            </button>

            {mobileMenuOpen && (
              <motion.ul
                className="mobile-options"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
              >
                <li onClick={() => { setActiveTab('ankara'); setMobileMenuOpen(false) }}>Ankara</li>
                <li onClick={() => { setActiveTab('hanging'); setMobileMenuOpen(false) }}>Hanging Tops</li>
                <li onClick={() => { setActiveTab('sweater'); setMobileMenuOpen(false) }}>Women Sweater</li>
                <li onClick={() => { setActiveTab('jeans'); setMobileMenuOpen(false) }}>Women Jeans</li>
              </motion.ul>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content-wrapper">
        {renderTabContent()}
      </div>

      {/* Snackbar for add to cart */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={currentProduct ? `Added ${currentProduct.name} to your cart` : ''}
      />

      {/* Product Modal */}
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={modalProduct}
        onAdd={handleAddToCart}
      />
    </Box>
  )
}

export default WomenCategory
