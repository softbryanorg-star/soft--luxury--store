import React from 'react'
import './FeaturedCollections.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import casual1 from '../assets/casual1.jpeg'
import mencasual2 from '../assets/Mencasual2.jpeg'
import acc1 from '../assets/acc1.jpeg'

const FeaturedCollections = () => {
  const collections = [
    { title: 'Soft Drapes', subtitle: 'Elegant womenswear', img: casual1, href: '/Women' },
    { title: 'Urban Edge', subtitle: 'Men streetwear', img: mencasual2, href: '/Men' },
    { title: 'Gilded Touch', subtitle: 'Accessories & Jewelry', img: acc1, href: '/Accessories' },
  ]

  return (
    <section className="featured-collections">
      <div className="wrap">
        {collections.map((c, i) => (
          <Link key={i} to={c.href} className="collection-link" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
              className="collection-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div
                className="image"
                style={{ backgroundImage: `url(${c.img})` }}
                role="img"
                aria-label={`${c.title} collection`}
              />
              <div className="info">
                <h3>{c.title}</h3>
                <p>{c.subtitle}</p>
                <span className="link">Explore</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCollections
