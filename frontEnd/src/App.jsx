import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Collection from "./pages/Collection"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import Contact from "./pages/Contact"
import NavBar from "./components/NavBar"
import Links from "./components/Links"
import Verify from "./pages/Verify"
import Footer from "./components/Footer"
import {ToastContainer} from "react-toastify"
import ForgotPassword from "./pages/ForgotPassword"
import MyProfile from "./pages/MyProfile"


const App = () => {
  return (
    <>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mx-auto">
      <ToastContainer/>
      <NavBar/>
      <Links/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/collection" element={<Collection/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/product/:productId" element={<Product/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/profile" element={<MyProfile/>}/>
      </Routes>
      
    </div>
    <div>
      <Footer/>
    </div>
    </>
  )
}
export default App

// ok