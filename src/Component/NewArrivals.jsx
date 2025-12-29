import React from 'react'
import Slider from 'react-slick'
import './NewArrivals.css'
import { Card, CardMedia, CardContent, Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../context/CartContext'

import casual1 from '../assets/casual1.jpeg'
import mencasual4 from '../assets/Mencasual4.jpeg'
import gown1 from '../assets/Gown1.jpeg'

const NewArrivals = () => {
  const { addToCart } = useCart()
  const products = [
    { name: 'Aurora Coat', image: casual1, price: 199.99 },
    { name: 'Nightfall Suit', image: mencasual4, price: 249.99 },
    { name: 'Emerald Gown', image: gown1, price: 329.99 },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <section className="new-arrivals">
      <div className="wrap">
        <h2>New Arrivals</h2>
        <Slider {...settings}>
          {products.map((p, i) => (
            <Card key={i} className="arrival-card">
              <CardMedia component="img" height="300" image={p.image} alt={p.name} />
              <CardContent>
                <h4>{p.name}</h4>
                <p>${p.price}</p>
                <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => addToCart(p)} fullWidth>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default NewArrivals
