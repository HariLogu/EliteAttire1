import { useContext, useState,useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem";
import { assets } from "../assets/assets";
import {Link} from "react-router-dom"

const LatestCollection = () => { 
    const {products}=useContext(ShopContext);
    const [latestProducts,setLatestProducts]=useState([])
    
    useEffect(()=>{
        setLatestProducts(products.slice(0,10))
    },[products])
    
    return (
    <div className="my-10">
        <div className=" uppercase text-xl md:text-3xl flex flex-col md:flex-row items-center gap-5">
            <Title text1={"latest"} text2={"collection"}/>
            <Link to="/collection">
                <div className="flex items-center gap-1 hover:bg-amber-300 bg-amber-200 px-3 py-2 rounded-full">
                    <p className="text-[10px]">explore</p>
                    <img src={assets.rightarrow} alt="" className="size-4" />
                </div>
            </Link>
            
            
        </div>
        {/* rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 my-6">
            {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} description={item.description} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}
export default LatestCollection

// ok