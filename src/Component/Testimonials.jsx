import React from 'react'
import Slider from 'react-slick'
import './Testimonials.css'

import muse1 from '../assets/muse1.jpeg'
import muse2 from '../assets/muse2.jpeg'
import womenImg from '../assets/women.jpeg'

const Testimonials = ()=>{
  const quotes = [
    { text: 'Wearing this brand changed how I walk into rooms.', author: ' Amina', img: muse1 },
    { text: 'Quality beyond price. Timeless pieces.', author: ' Marcus', img: muse2 },
    { text: 'Their accessories have a subtle power.', author: ' Zoe', img: womenImg },
  ]
  const settings = { dots:true, infinite:true, speed:800, slidesToShow:1, slidesToScroll:1, autoplay:true, autoplaySpeed:4500 }
  return (
    <section className="testimonials">
      <div className="wrap">
        <Slider {...settings}>
          {quotes.map((q,i)=>(
            <div key={i} className="testimonial-slide">
              <img className="avatar" src={q.img} alt={q.author} />
              <div className="quote">
                <p>“{q.text}”</p>
                <span>{q.author}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
export default Testimonials
