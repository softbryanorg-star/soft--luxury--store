import React from 'react'
import { motion } from 'framer-motion'
import './PromoBanner.css'

const PromoBanner = () => {
  return (
    <section className="promo-banner">
      <motion.div
        className="promo-inner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h1>Soft Luxury <br />
         Crafted For Presence</h1>
        <p>Discover limited-edition pieces that speak softly but command attention.</p>
        <div className="promo-ctas">
          <a className="btn primary" href="/Women">Shop Women</a>
          <a className="btn" href="/Men">Shop Men</a>
        </div>
      </motion.div>
    </section>
  )
}

export default PromoBanner
