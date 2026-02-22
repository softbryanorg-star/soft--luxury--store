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
import ProtectedRoute from "./Component/ProtectedRoute"
import Checkout from "./Pages/Checkout";
import AdminRoute from "./Component/AdminRoute";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Products from "./Pages/Admin/Products";
import ProductForm from "./Pages/Admin/ProductForm";
import Orders from "./Pages/Admin/Orders";
import OrderDetail from "./Pages/Admin/OrderDetail";

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
        {/* protect lowercase /cart route; Nav links use /cart */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        {/* keep legacy /Cart path for backwards compatibility */}
        <Route path="/Cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/Checkout" element={<Checkout />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout/></AdminRoute>}>
          <Route index element={<Dashboard/>} />
          <Route path="products" element={<Products/>} />
          <Route path="products/:id/edit" element={<ProductForm/>} />
          <Route path="products/new" element={<ProductForm/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="orders/:id" element={<OrderDetail/>} />
        </Route>


      </Routes> 
    </CartProvider>
   
    
  )
}

export default App