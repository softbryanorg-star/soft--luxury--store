import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import {Route, Routes } from "react-router-dom"
import './App.css';
import Nav from "./Component/Nav"
import Home from "./Pages/Home"
import About from  "./Pages/About"
import Accessories from "./Pages/Accessories"
import Registration from "./Pages/Registration"
import Contact from "./Pages/Contact"
import Men from "./Pages/Men"
import MenCategory from "./Pages/MenCategory"
import  Women from "./Pages/Women"
import WomenCategory from "./Pages/WomenCategory"
import  Login from  "./Pages/Login"
import { CartProvider } from "./context/CartContext";
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout";

function App() {

  return (
    <CartProvider>
    <Nav/>
    <Routes>
      <Route path ="/" element ={<Home/>}/>
      <Route path = "/About" element= {<About/>}/>
       <Route path="/Accessories" element={<Accessories />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Men" element={<Men />} />
        <Route path="/MenCategory" element={<MenCategory />} />
        <Route path="/Women" element={<Women />} />
        <Route path="/WomenCategory" element={<WomenCategory />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />



      </Routes> 
    </CartProvider>
   
    
  )
}

export default App