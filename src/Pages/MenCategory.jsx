import React, { useState } from 'react'
import { Box, Button, Card, CardMedia, CardContent, Typography, Snackbar } from '@mui/material'
import { motion } from 'framer-motion'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../context/CartContext'
import ProductModal from '../Component/ProductModal'
import './MenCategory.css'

// Mensuit images
import mensuit1 from '../assets/Mensuit1.jpeg'
import mensuit2 from '../assets/Mensuit2.jpeg'
import mensuit3 from '../assets/Mensuit3.jpeg'
import mensuit4 from '../assets/Mensuit4.jpeg'
import mensuit5 from '../assets/Mensuit5.jpeg'
import mensuit6 from '../assets/Mensuit6.jpeg'
import mensuit7 from '../assets/Mensuit7.jpeg'
import mensuit8 from '../assets/Mensuit8.jpeg'
import mensuit9 from '../assets/Mensuit9.jpeg'

// Short shirt images
import shortshirt1 from '../assets/Shortshirt1.jpeg'
import shortshirt2 from '../assets/Shortshirt2.jpeg'
import shortshirt3 from '../assets/Shortshirt3.jpeg'
import shortshirt4 from '../assets/Shortshirt4.jpeg'
import shortshirt5 from '../assets/Shortshirt5.jpeg'
import shortshirt6 from '../assets/Shortshirt6.jpeg'
import shortshirt7 from '../assets/Shortshirt7.jpeg'
import shortshirt8 from '../assets/Shortshirt9.jpeg'
import shortshirt9 from '../assets/Shortshirt9.jpeg'
import shortshirt10 from '../assets/Shortshirt10.jpeg'
import shortshirt11 from '../assets/Shortshirt11.jpeg'

// Mentop images
import mentop1 from '../assets/Mentop1.jpeg'
import mentop2 from '../assets/Mentop2.jpeg'
import mentop3 from '../assets/Mentop3.jpeg'
import mentop4 from '../assets/Mentop4.jpeg'
import mentop5 from '../assets/Mentop5.jpeg'
import mentop6 from '../assets/Mentop6.jpeg'
import mentop7 from '../assets/Mentop7.jpeg'
import mentop8 from '../assets/Mentop8.jpeg'
import mentop9 from '../assets/Mentop9.jpeg'
import mentop10 from '../assets/Mentop10.jpeg'
import mentop11 from '../assets/Mentop11.jpeg'

// Blazerjacket images
import blazerjacket1 from '../assets/Blazerjacket1.jpeg'
import blazerjacket2 from '../assets/Blazerjacket2.jpeg'
import blazerjacket3 from '../assets/Blazerjacket3.jpeg'
import blazerjacket4 from '../assets/Blazerjacket4.jpeg'
import blazerjacket5 from '../assets/Blazerjacket5.jpeg'
import blazerjacket6 from '../assets/Blazerjacket6.jpeg'
import blazerjacket7 from '../assets/Blazerjacket7.jpeg'
import blazerjacket8 from '../assets/Blazerjacket8.jpeg'

// Blazershirt images
import blazershirt1 from '../assets/Blazershirt1.jpeg'
import blazershirt2 from '../assets/Blazershirt2.jpeg'
import blazershirt3 from '../assets/Blazershirt3.jpeg'
import blazershirt4 from '../assets/Blazershirt4.jpeg'
import blazershirt5 from '../assets/Blazershirt5.jpeg'
import blazershirt6 from '../assets/Blazershirt6.jpeg'
import blazershirt7 from '../assets/Blazershirt7.jpeg'
import blazershirt8 from '../assets/Blazershirt8.jpeg'
import blazershirt9 from '../assets/Blazershirt9.jpeg'
import blazershirt10 from '../assets/Blazershirt10.jpeg'
import blazershirt11 from '../assets/Blazershirt11.jpeg'

// Gymwear images
import gymwear1 from '../assets/Gymwear1.jpeg'
import gymwear2 from '../assets/Gymwear2.jpeg'
import gymwear3 from '../assets/Gymwear3.jpeg'
import gymwear4 from '../assets/Gymwear4.jpeg'
import gymwear5 from '../assets/Gymwear5.jpeg'
import gymwear6 from '../assets/Gymwear6.jpeg'
import gymwear7 from '../assets/Gymwear7.jpeg'
import gymwear8 from '../assets/Gymwear8.jpeg'
import gymwear9 from '../assets/Gymwear9.jpeg'
import gymwear10 from '../assets/Gymwear10.jpeg'

// Menhood (sweaters) images
import menhood1 from '../assets/Menhood1.jpeg'
import menhood2 from '../assets/Menhood2.jpeg'
import menhood3 from '../assets/Menhood3.jpeg'
import menhood4 from '../assets/Menhood4.jpeg'
import menhood5 from '../assets/Menhood5.jpeg'
import menhood6 from '../assets/Menhood6.jpeg'

// Menjacket (coats) images
import menjacket1 from '../assets/Menjacket1.jpeg'
import menjacket2 from '../assets/Menjacket2.jpeg'
import menjacket3 from '../assets/Menjacket3.jpeg'
import menjacket4 from '../assets/Menjacket4.jpeg'
import menjacket5 from '../assets/Menjacket5.jpeg'
import menjacket6 from '../assets/Menjacket6.jpeg'

// Menjeans images
import menjeans1 from '../assets/Menjean1.jpeg'
import menjeans2 from '../assets/Menjean2.jpeg'
import menjeans3 from '../assets/Menjean3.jpeg'
import menjeans4 from '../assets/Menjean4.jpeg'
import menjeans5 from '../assets/Menjean5.jpeg'
import menjeans6 from '../assets/Menjean6.jpeg'
import menjeans7 from '../assets/Menjean7.jpeg'
import menjeans8 from '../assets/Menjean8.jpeg'
import menjeans9 from '../assets/Menjean9.jpeg'
import menjeans10 from '../assets/Menjean10.jpeg'

// Pajama images
import pajama1 from '../assets/Pajama1.jpeg'
import pajama2 from '../assets/Pajama2.jpeg'
import pajama3 from '../assets/Pajama3.jpeg'
import pajama4 from '../assets/Pajama4.jpeg'
import pajama5 from '../assets/Pajama5.jpeg'
import pajama6 from '../assets/Pajama6.jpeg'

// Short (shorts) images
import short1 from '../assets/Short1.jpeg'
import short2 from '../assets/Short2.jpeg'
import short3 from '../assets/Short3.jpeg'
import short4 from '../assets/Short4.jpeg'
import short5 from '../assets/Short5.jpeg'
import short6 from '../assets/Short6.jpeg'

// Trouser images
import trouser1 from '../assets/Trouser1.jpeg'
import trouser2 from '../assets/Trouser2.jpeg'
import trouser3 from '../assets/Trouser3.jpeg'
import trouser4 from '../assets/Trouser4.jpeg'

// Turtleneck images
import turtleneck1 from '../assets/Turtleneck1.jpeg'
import turtleneck2 from '../assets/Turtleneck2.jpeg'
import turtleneck3 from '../assets/Turtleneck3.jpeg'
import turtleneck4 from '../assets/Turtleneck4.jpeg'

// Wintercoat images
import wintercoat1 from '../assets/Wintercoat1.jpeg'
import wintercoat2 from '../assets/Wintercoat2.jpeg'
import wintercoat3 from '../assets/Wintercoat3.jpeg'
import wintercoat4 from '../assets/Wintercoat4.jpeg'
import wintercoat5 from '../assets/Wintercoat5.jpeg'
import wintercoat6 from '../assets/Wintercoat6.jpeg'
import wintercoat7 from '../assets/Wintercoat7.jpeg'

const MenCategory = () => {
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState('suits')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const suitsProducts = [
    { id: 1, name: 'Classic Luxury Suit', image: mensuit1, price: 349.99, description: 'Timeless luxury suit with impeccable tailoring and premium fabric.' },
    { id: 2, name: 'Modern Executive Suit', image: mensuit2, price: 379.99, description: 'Contemporary executive suit perfect for boardroom sophistication.' },
    { id: 3, name: 'Elegant Formal Suit', image: mensuit3, price: 399.99, description: 'Elegant formal suit for special occasions and events.' },
    { id: 4, name: 'Premium Business Suit', image: mensuit4, price: 359.99, description: 'Premium business suit combining comfort and style.' },
    { id: 5, name: 'Sophisticated Dress Suit', image: mensuit5, price: 389.99, description: 'Sophisticated dress suit showcasing fine craftsmanship.' },
    { id: 6, name: 'Designer Luxury Suit', image: mensuit6, price: 429.99, description: 'Designer luxury suit with exclusive pattern and premium finish.' },
    { id: 7, name: 'Charcoal Formal Suit', image: mensuit7, price: 369.99, description: 'Charcoal formal suit ideal for professional and formal events.' },
    { id: 8, name: 'Navy Power Suit', image: mensuit8, price: 419.99, description: 'Navy power suit that commands attention and respect.' },
    { id: 9, name: 'Burgundy Accent Suit', image: mensuit9, price: 409.99, description: 'Burgundy accent suit for bold fashion-forward individuals.' },
  ]

  const tshirtProducts = [
    { id: 10, name: 'Classic Cotton T-Shirt', image: shortshirt1, price: 49.99, description: 'Classic cotton t-shirt perfect for everyday wear.' },
    { id: 11, name: 'Premium Fitted Tee', image: shortshirt2, price: 59.99, description: 'Premium fitted tee with sleek modern design.' },
    { id: 12, name: 'Casual Crew Neck', image: shortshirt3, price: 44.99, description: 'Casual crew neck t-shirt for relaxed comfort.' },
    { id: 13, name: 'Athletic Performance Tee', image: shortshirt4, price: 54.99, description: 'Athletic performance tee with moisture-wicking fabric.' },
    { id: 14, name: 'Luxury Cotton Blend', image: shortshirt5, price: 64.99, description: 'Luxury cotton blend t-shirt offering ultimate comfort.' },
    { id: 15, name: 'Minimalist Design Tee', image: shortshirt6, price: 52.99, description: 'Minimalist design tee showcasing elegant simplicity.' },
    { id: 16, name: 'Streetwear Style Shirt', image: shortshirt7, price: 56.99, description: 'Streetwear style shirt perfect for casual outings.' },
    { id: 17, name: 'Premium V-Neck Tee', image: shortshirt8, price: 59.99, description: 'Premium v-neck tee with superior fit and comfort.' },
    { id: 18, name: 'Vintage Look T-Shirt', image: shortshirt9, price: 54.99, description: 'Vintage look t-shirt with nostalgic charm.' },
    { id: 19, name: 'Modern Graphic Tee', image: shortshirt10, price: 57.99, description: 'Modern graphic tee with bold artistic design.' },
    { id: 20, name: 'Luxury Heritage Shirt', image: shortshirt11, price: 67.99, description: 'Luxury heritage shirt crafted from finest materials.' },
  ]

  const topProducts = [
    { id: 21, name: 'Luxury Polo Shirt', image: mentop1, price: 84.99, description: 'Luxury polo shirt with refined elegance.' },
    { id: 22, name: 'Premium Button-Up Top', image: mentop2, price: 94.99, description: 'Premium button-up top for sophisticated style.' },
    { id: 23, name: 'Casual Linen Shirt', image: mentop3, price: 79.99, description: 'Casual linen shirt perfect for warm seasons.' },
    { id: 24, name: 'Formal White Shirt', image: mentop4, price: 99.99, description: 'Formal white shirt ideal for professional settings.' },
    { id: 25, name: 'Striped Luxury Top', image: mentop5, price: 89.99, description: 'Striped luxury top with timeless pattern.' },
    { id: 26, name: 'Oxford Cloth Shirt', image: mentop6, price: 109.99, description: 'Oxford cloth shirt showcasing classic craftsmanship.' },
    { id: 27, name: 'Silk Blend Top', image: mentop7, price: 119.99, description: 'Silk blend top offering ultimate luxury.' },
    { id: 28, name: 'Casual Henley Neck', image: mentop8, price: 74.99, description: 'Casual henley neck shirt for laid-back style.' },
    { id: 29, name: 'Premium Denim Shirt', image: mentop9, price: 99.99, description: 'Premium denim shirt with versatile appeal.' },
    { id: 30, name: 'Luxury Chambray Top', image: mentop10, price: 94.99, description: 'Luxury chambray top for refined casual wear.' },
    { id: 31, name: 'Designer Pattern Shirt', image: mentop11, price: 124.99, description: 'Designer pattern shirt with exclusive aesthetic.' },
  ]

  const blazerJacketProducts = [
    { id: 32, name: 'Classic Black Blazer', image: blazerjacket1, price: 249.99, description: 'Classic black blazer perfect for any occasion.' },
    { id: 33, name: 'Navy Luxury Blazer', image: blazerjacket2, price: 269.99, description: 'Navy luxury blazer with impeccable tailoring.' },
    { id: 34, name: 'Charcoal Formal Blazer', image: blazerjacket3, price: 259.99, description: 'Charcoal formal blazer for professional settings.' },
    { id: 35, name: 'Brown Tweed Jacket', image: blazerjacket4, price: 279.99, description: 'Brown tweed jacket with classic elegance.' },
    { id: 36, name: 'Designer Wool Blazer', image: blazerjacket5, price: 299.99, description: 'Designer wool blazer showcasing premium quality.' },
    { id: 37, name: 'Burgundy Accent Blazer', image: blazerjacket6, price: 289.99, description: 'Burgundy accent blazer for bold fashion statements.' },
    { id: 38, name: 'Slim Fit Blazer', image: blazerjacket7, price: 239.99, description: 'Slim fit blazer with modern silhouette.' },
    { id: 39, name: 'Premium Silk Blazer', image: blazerjacket8, price: 319.99, description: 'Premium silk blazer offering ultimate luxury.' },
  ]

  const blazerShirtProducts = [
    { id: 40, name: 'Crisp White Dress Shirt', image: blazershirt1, price: 89.99, description: 'Crisp white dress shirt for blazer wear.' },
    { id: 41, name: 'Light Blue Formal Shirt', image: blazershirt2, price: 94.99, description: 'Light blue formal shirt ideal for office.' },
    { id: 42, name: 'Striped Dress Shirt', image: blazershirt3, price: 99.99, description: 'Striped dress shirt with sophisticated pattern.' },
    { id: 43, name: 'Oxford Formal Shirt', image: blazershirt4, price: 109.99, description: 'Oxford formal shirt with premium finish.' },
    { id: 44, name: 'Burgundy Dress Shirt', image: blazershirt5, price: 104.99, description: 'Burgundy dress shirt for bold formal looks.' },
    { id: 45, name: 'Luxury Cotton Shirt', image: blazershirt6, price: 119.99, description: 'Luxury cotton shirt for executive style.' },
    { id: 46, name: 'Checkered Formal Shirt', image: blazershirt7, price: 99.99, description: 'Checkered formal shirt with timeless design.' },
    { id: 47, name: 'Silk Blend Dress Shirt', image: blazershirt8, price: 129.99, description: 'Silk blend dress shirt for ultimate luxury.' },
    { id: 48, name: 'Navy Formal Shirt', image: blazershirt9, price: 94.99, description: 'Navy formal shirt perfect for business settings.' },
    { id: 49, name: 'Premium White Shirt', image: blazershirt10, price: 114.99, description: 'Premium white shirt with impeccable tailoring.' },
    { id: 50, name: 'Designer Dress Shirt', image: blazershirt11, price: 139.99, description: 'Designer dress shirt with exclusive pattern.' },
  ]

  const gymwearProducts = [
    { id: 51, name: 'Performance Athletic Tee', image: gymwear1, price: 49.99, description: 'Performance athletic tee with moisture-wicking technology.' },
    { id: 52, name: 'Gym Shorts Pro', image: gymwear2, price: 54.99, description: 'Gym shorts pro designed for intense workouts.' },
    { id: 53, name: 'Compression Fit Top', image: gymwear3, price: 59.99, description: 'Compression fit top for muscle support.' },
    { id: 54, name: 'Running Track Jacket', image: gymwear4, price: 74.99, description: 'Running track jacket for outdoor fitness.' },
    { id: 55, name: 'Breathable Gym Tank', image: gymwear5, price: 44.99, description: 'Breathable gym tank for intense training.' },
    { id: 56, name: 'Athletic Joggers', image: gymwear6, price: 69.99, description: 'Athletic joggers combining comfort and style.' },
    { id: 57, name: 'Premium Gym Wear Set', image: gymwear7, price: 89.99, description: 'Premium gym wear set for complete fitness look.' },
    { id: 58, name: 'Sweat-Proof Shirt', image: gymwear8, price: 54.99, description: 'Sweat-proof shirt with advanced fabric technology.' },
    { id: 59, name: 'Cross-Training Top', image: gymwear9, price: 59.99, description: 'Cross-training top for versatile workouts.' },
    { id: 60, name: 'Luxury Athletic Wear', image: gymwear10, price: 79.99, description: 'Luxury athletic wear combining performance and elegance.' },
  ]

  const sweaterProducts = [
    { id: 61, name: 'Classic Wool Sweater', image: menhood1, price: 119.99, description: 'Classic wool sweater perfect for layering.' },
    { id: 62, name: 'Luxury Cashmere Blend', image: menhood2, price: 149.99, description: 'Luxury cashmere blend sweater for ultimate comfort.' },
    { id: 63, name: 'Crew Neck Sweater', image: menhood3, price: 109.99, description: 'Crew neck sweater with timeless elegance.' },
    { id: 64, name: 'V-Neck Luxury Sweater', image: menhood4, price: 129.99, description: 'V-neck luxury sweater showcasing fine craftsmanship.' },
    { id: 65, name: 'Cable Knit Sweater', image: menhood5, price: 139.99, description: 'Cable knit sweater with sophisticated texture.' },
    { id: 66, name: 'Turtleneck Premium Sweater', image: menhood6, price: 144.99, description: 'Turtleneck premium sweater for maximum warmth.' },
  ]

  const coatProducts = [
    { id: 67, name: 'Classic Wool Coat', image: menjacket1, price: 249.99, description: 'Classic wool coat for timeless style.' },
    { id: 68, name: 'Luxury Overcoat', image: menjacket2, price: 299.99, description: 'Luxury overcoat with premium tailoring.' },
    { id: 69, name: 'Formal Dress Coat', image: menjacket3, price: 279.99, description: 'Formal dress coat perfect for special occasions.' },
    { id: 70, name: 'Business Coat', image: menjacket4, price: 269.99, description: 'Business coat ideal for professional settings.' },
    { id: 71, name: 'Designer Coat', image: menjacket5, price: 319.99, description: 'Designer coat with exclusive aesthetic.' },
    { id: 72, name: 'Premium Camel Coat', image: menjacket6, price: 289.99, description: 'Premium camel coat showcasing elegance.' },
  ]

  const jeansProducts = [
    { id: 73, name: 'Classic Blue Jeans', image: menjeans1, price: 89.99, description: 'Classic blue jeans perfect for everyday wear.' },
    { id: 74, name: 'Slim Fit Jeans', image: menjeans2, price: 99.99, description: 'Slim fit jeans with modern silhouette.' },
    { id: 75, name: 'Dark Wash Denim', image: menjeans3, price: 94.99, description: 'Dark wash denim for sophisticated casual look.' },
    { id: 76, name: 'Luxury Premium Jeans', image: menjeans4, price: 129.99, description: 'Luxury premium jeans with superior quality.' },
    { id: 77, name: 'Distressed Style Jeans', image: menjeans5, price: 99.99, description: 'Distressed style jeans for trendy fashion.' },
    { id: 78, name: 'Black Denim Jeans', image: menjeans6, price: 94.99, description: 'Black denim jeans with versatile appeal.' },
    { id: 79, name: 'Straight Leg Jeans', image: menjeans7, price: 84.99, description: 'Straight leg jeans for classic comfort.' },
    { id: 80, name: 'Luxury Cotton Jeans', image: menjeans8, price: 119.99, description: 'Luxury cotton jeans with premium finish.' },
    { id: 81, name: 'Designer Jeans', image: menjeans9, price: 139.99, description: 'Designer jeans with exclusive pattern.' },
    { id: 82, name: 'Premium Stretch Jeans', image: menjeans10, price: 109.99, description: 'Premium stretch jeans for ultimate comfort.' },
  ]

  const pajamaProducts = [
    { id: 83, name: 'Silk Pajama Set', image: pajama1, price: 99.99, description: 'Silk pajama set for luxurious sleep.' },
    { id: 84, name: 'Cotton Comfort Pajamas', image: pajama2, price: 79.99, description: 'Cotton comfort pajamas perfect for night.' },
    { id: 85, name: 'Premium Loungewear', image: pajama3, price: 89.99, description: 'Premium loungewear for ultimate relaxation.' },
    { id: 86, name: 'Luxury Sleep Set', image: pajama4, price: 109.99, description: 'Luxury sleep set with premium materials.' },
    { id: 87, name: 'Casual Pajamas', image: pajama5, price: 69.99, description: 'Casual pajamas for comfortable sleeping.' },
    { id: 88, name: 'Designer Pajama Suit', image: pajama6, price: 119.99, description: 'Designer pajama suit showcasing elegance.' },
  ]

  const shortProducts = [
    { id: 89, name: 'Athletic Shorts', image: short1, price: 54.99, description: 'Athletic shorts perfect for sports and gym.' },
    { id: 90, name: 'Casual Bermuda Shorts', image: short2, price: 64.99, description: 'Casual bermuda shorts for laid-back style.' },
    { id: 91, name: 'Luxury Shorts', image: short3, price: 74.99, description: 'Luxury shorts with premium craftsmanship.' },
    { id: 92, name: 'Chino Shorts', image: short4, price: 59.99, description: 'Chino shorts perfect for casual outings.' },
    { id: 93, name: 'Beach Shorts', image: short5, price: 49.99, description: 'Beach shorts ideal for summer vacation.' },
    { id: 94, name: 'Designer Shorts', image: short6, price: 79.99, description: 'Designer shorts with exclusive aesthetic.' },
  ]

  const trouserProducts = [
    { id: 95, name: 'Classic Dress Trousers', image: trouser1, price: 99.99, description: 'Classic dress trousers for formal occasions.' },
    { id: 96, name: 'Business Trousers', image: trouser2, price: 89.99, description: 'Business trousers ideal for office wear.' },
    { id: 97, name: 'Premium Wool Trousers', image: trouser3, price: 119.99, description: 'Premium wool trousers with fine quality.' },
    { id: 98, name: 'Designer Dress Pants', image: trouser4, price: 129.99, description: 'Designer dress pants with exclusive design.' },
  ]

  const turtleneckProducts = [
    { id: 99, name: 'Classic Turtleneck', image: turtleneck1, price: 79.99, description: 'Classic turtleneck for timeless warmth.' },
    { id: 100, name: 'Luxury Long Sleeve', image: turtleneck2, price: 99.99, description: 'Luxury long sleeve turtleneck with premium feel.' },
    { id: 101, name: 'Merino Wool Turtleneck', image: turtleneck3, price: 109.99, description: 'Merino wool turtleneck for superior comfort.' },
    { id: 102, name: 'Designer Turtleneck', image: turtleneck4, price: 119.99, description: 'Designer turtleneck showcasing elegance.' },
  ]

  const wintercoatProducts = [
    { id: 103, name: 'Premium Winter Coat', image: wintercoat1, price: 299.99, description: 'Premium winter coat with ultimate warmth.' },
    { id: 104, name: 'Luxury Parka', image: wintercoat2, price: 319.99, description: 'Luxury parka perfect for extreme cold.' },
    { id: 105, name: 'Insulated Jacket', image: wintercoat3, price: 279.99, description: 'Insulated jacket for maximum protection.' },
    { id: 106, name: 'Designer Winter Coat', image: wintercoat4, price: 349.99, description: 'Designer winter coat with exclusive style.' },
    { id: 107, name: 'Casual Puffer Jacket', image: wintercoat5, price: 259.99, description: 'Casual puffer jacket combining warmth and comfort.' },
    { id: 108, name: 'Wool Blend Coat', image: wintercoat6, price: 289.99, description: 'Wool blend coat for sophisticated winter look.' },
    { id: 109, name: 'Premium Trench Coat', image: wintercoat7, price: 329.99, description: 'Premium trench coat with timeless elegance.' },
  ]

  const handleAddToCart = (product) => {
    addToCart(product)
    setCurrentProduct(product)
    setOpenSnackbar(true)
  }

  const openProduct = (product) => {
    setModalProduct(product)
    setModalOpen(true)
  }

  const tabOptions = [
    { value: 'suits', label: 'LUXURY SUITS' },
    { value: 'tshirt', label: 'T SHIRT' },
    { value: 'top', label: 'LUXURY TOP' },
    { value: 'blazerjacket', label: 'LUXURY BLAZER JACKETS' },
    { value: 'blazershirt', label: 'LUXURY BLAZER T SHIRTS' },
    { value: 'gymwear', label: 'LUXURY GYM WEARS' },
    { value: 'sweater', label: 'LUXURY SWEATERS' },
    { value: 'coat', label: 'LUXURY MEN COATS' },
    { value: 'jeans', label: 'LUXURY MEN JEANS' },
    { value: 'pajama', label: 'LUXURY MEN PAJAMAS' },
    { value: 'short', label: 'LUXURY BLAZER SHORTS' },
    { value: 'trouser', label: 'LUXURY MEN TROUSERS' },
    { value: 'turtleneck', label: 'LUXURY TURTLE NECK LONG SLEEVES' },
    { value: 'wintercoat', label: 'LUXURY MEN WINTERCOAT' },
  ]

  const renderTabContent = () => {
    let products = []
    switch (activeTab) {
      case 'suits': products = suitsProducts; break
      case 'tshirt': products = tshirtProducts; break
      case 'top': products = topProducts; break
      case 'blazerjacket': products = blazerJacketProducts; break
      case 'blazershirt': products = blazerShirtProducts; break
      case 'gymwear': products = gymwearProducts; break
      case 'sweater': products = sweaterProducts; break
      case 'coat': products = coatProducts; break
      case 'jeans': products = jeansProducts; break
      case 'pajama': products = pajamaProducts; break
      case 'short': products = shortProducts; break
      case 'trouser': products = trouserProducts; break
      case 'turtleneck': products = turtleneckProducts; break
      case 'wintercoat': products = wintercoatProducts; break
      default: products = suitsProducts
    }

    return (
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="tab-content"
      >
        <div className="products-grid grid-standard">
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
    <Box className="men-category-page">
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
          <h1>WELCOME TO MEN CATEGORY</h1>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {/* Desktop buttons */}
        <div className="tab-buttons">
          <button className={`tab-btn ${activeTab === 'suits' ? 'active' : ''}`} onClick={() => setActiveTab('suits')}>LUXURY SUITS</button>
          <button className={`tab-btn ${activeTab === 'tshirt' ? 'active' : ''}`} onClick={() => setActiveTab('tshirt')}>T SHIRT</button>
          <button className={`tab-btn ${activeTab === 'top' ? 'active' : ''}`} onClick={() => setActiveTab('top')}>LUXURY TOP</button>
          <button className={`tab-btn ${activeTab === 'blazerjacket' ? 'active' : ''}`} onClick={() => setActiveTab('blazerjacket')}>LUXURY BLAZER JACKETS</button>
          <button className={`tab-btn ${activeTab === 'blazershirt' ? 'active' : ''}`} onClick={() => setActiveTab('blazershirt')}>LUXURY BLAZER T SHIRTS</button>
          <button className={`tab-btn ${activeTab === 'gymwear' ? 'active' : ''}`} onClick={() => setActiveTab('gymwear')}>LUXURY GYM WEARS</button>
          <button className={`tab-btn ${activeTab === 'sweater' ? 'active' : ''}`} onClick={() => setActiveTab('sweater')}>LUXURY SWEATERS</button>
          <button className={`tab-btn ${activeTab === 'coat' ? 'active' : ''}`} onClick={() => setActiveTab('coat')}>LUXURY MEN COATS</button>
          <button className={`tab-btn ${activeTab === 'jeans' ? 'active' : ''}`} onClick={() => setActiveTab('jeans')}>LUXURY MEN JEANS</button>
          <button className={`tab-btn ${activeTab === 'pajama' ? 'active' : ''}`} onClick={() => setActiveTab('pajama')}>LUXURY MEN PAJAMAS</button>
          <button className={`tab-btn ${activeTab === 'short' ? 'active' : ''}`} onClick={() => setActiveTab('short')}>LUXURY BLAZER SHORTS</button>
          <button className={`tab-btn ${activeTab === 'trouser' ? 'active' : ''}`} onClick={() => setActiveTab('trouser')}>LUXURY MEN TROUSERS</button>
          <button className={`tab-btn ${activeTab === 'turtleneck' ? 'active' : ''}`} onClick={() => setActiveTab('turtleneck')}>LUXURY TURTLE NECK LONG SLEEVES</button>
          <button className={`tab-btn ${activeTab === 'wintercoat' ? 'active' : ''}`} onClick={() => setActiveTab('wintercoat')}>LUXURY MEN WINTERCOAT</button>
        </div>

        {/* Mobile dropdown with search */}
        <div className="tab-mobile">
          <div className="tab-left">Category</div>
          <div className="tab-select-wrap">
            <button className="tab-select" onClick={() => setMobileMenuOpen((s) => !s)} aria-expanded={mobileMenuOpen}>
              {tabOptions.find((opt) => opt.value === activeTab)?.label || 'SUITS'}
              <span className={`chev ${mobileMenuOpen ? 'open' : ''}`}>▾</span>
            </button>
            {mobileMenuOpen && (
              <motion.div className="mobile-dropdown-content" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                <ul className="mobile-options">
                  {tabOptions.map((opt) => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        setActiveTab(opt.value)
                        setMobileMenuOpen(false)
                      }}
                      className={activeTab === opt.value ? 'active' : ''}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content-wrapper">
        {renderTabContent()}
      </div>

      {/* Snackbar */}
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

export default MenCategory
