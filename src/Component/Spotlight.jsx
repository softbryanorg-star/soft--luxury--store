import React from 'react'
import './Spotlight.css'
import { motion } from 'framer-motion'

const Spotlight = () => {
  return (
    <section className="spotlight">
      <motion.div className="spotlight-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="left">
          <h2>Masterpiece of the Season</h2>
          <p className="lead">Hand-stitched, sustainably sourced — the gown that embraces culture.</p>
          <a className="shop-btn" href="/Women">Explore the Masterpiece women collection</a>
        </div>
        <div className="right">
          <div className="image" style={{ backgroundImage: 'url(/src/assets/Gown3.jpeg)' }} />
        </div>
      </motion.div>                     
    </section>
  )
}

export default Spotlight
