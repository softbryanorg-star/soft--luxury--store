import "./Card2.css"
import Don from '../assets/men.jpg'
import gwen from '../assets/Women1.jpeg'
import john from '../assets/Accessories.jpg'

const Card2 = () => {
  return (
        <div className="images"> 
       
        <div className="image">
             <img src={Don} alt="" />
        </div>
       
        <div className="image">
            <img src={gwen} alt="" />

        </div>
        <div className="image">
             <img src={john} alt="" />
        </div>
        </div>
       
  )
}

export default Card2
