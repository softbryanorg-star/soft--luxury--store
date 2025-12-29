import React from "react";
import "./Hero.css";
import dark from "../assets/dark.png";

const Hero = () => {
  return (
    <div className="hero container">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>SOFT LUXURY</h1>
          <p>
             Where silence meets silk, and every thread whispers confidence.
             <br />   Style isn’t worn it’s embodied.
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Hero;
