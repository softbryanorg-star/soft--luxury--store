import React from 'react'
import './Footer.css'

const Footer = ()=>{
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="col">
          <h4>Soft Luxury</h4>
          <p>Timeless pieces. Quiet power.</p>
        </div>
        <div className="col">
          <h5>Explore</h5>
          <a href="/Women">Women</a>
          <a href="/Men">Men</a>
          <a href="/Accessories">Accessories</a>
        </div>
        <div className="col">
          <h5>Contact</h5>
          <p>softbryan.org@gmail.com</p>
        </div>
      </div>
      <div className="bottom">© {new Date().getFullYear()} Soft Luxury</div>
    </footer>
  )
}
export default Footer
