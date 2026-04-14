import Title from "./Title"
import { useContext, useState,useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestseller,setBestseller]=useState([])

    useEffect(()=>{
        const bestProduct=products.filter((item)=>(item.bestseller));
        setBestseller(bestProduct.slice(0,8))
    },[products])
  return (
    <div className="my-10">
        <div className="text-center uppercase text-2xl md:text-3xl">
            <Title text1={"best"} text2={"seller"}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 capitalize">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, saepe. Molestiae vero repellendus aspernatur unde tenetur.</p>
        </div>
        {/* rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 my-6">
            {
                bestseller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} description={item.description} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}
export default BestSeller

// ok