import React from 'react'
import "./Contact.css";


const Contact = () => {
  return (
    <div>
      <div className="contact-page">
  <div className="contact-container">
    <h1 >Soft Luxury 
        <br /> Where Elegance Whispers and Souls Connect</h1>
    <p className="contact-description">
      Every thread of luxury begins with a conversation. 
   <br />  Every masterpiece
            of style begins with a “hello.” <br />
            If your heart seeks garments that <em>breathe poetry</em>, 
         <br />   if your spirit longs for fabrics that
            remember your name
         <br />   then you’ve arrived where fashion meets soul.
            <br />
            Write to us, dream with us, or simply whisper your desire below.
             <br />   Soft Luxury is not just a brand  it’s a feeling, and you are part
            of its unfolding story.
    </p>
    

    <div className="contact-info">
      <p>📍 Studio: The House of Soft Luxury, London England</p>
      <p>📧 Email: softbryan.org@gmail.com.com</p>
    </div>

    <form className="contact-form">
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <textarea rows="5" placeholder="Your Message..." />
      <button className="contact-button">Send Message</button>
    </form>

    <p className="contact-signature"> Soft Luxury Founded by Soft Bryan</p>
  </div>
</div>

    </div>
  )
}

export default Contact
