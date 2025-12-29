import React from 'react'
import './AnimatedCTA.css'
import { motion } from 'framer-motion'

const AnimatedCTA = ()=>{
  return (
    <section className="animated-cta">
      <motion.div className="cta-inner" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.8 }}>
        <h3>Elevate Your Wardrobe</h3>
        <p>Exclusive drop — limited quantities. Reserve yours now.</p>
        <a href="/Women" className="cta-button">Reserve Now</a>
      </motion.div>
    </section>
  )
}
export default AnimatedCTA
