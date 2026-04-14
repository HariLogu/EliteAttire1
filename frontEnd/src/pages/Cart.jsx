import React, { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {

  const {products,currency,cartItems,updateQuantity,navigate}=useContext(ShopContext);
  const [cartData,setCartData]=useState([]);

  useEffect(()=>{
    if(products.length>0){
      const temp=[];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] >0){
            temp.push({
              _id:items,
              size:item,
              quantity:cartItems[items][item]
            })
          }
        }
      }
      setCartData(temp);
    }
    
  },[cartItems,products])

  console.log(cartData.length);
  
  
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3 uppercase">
        {cartData.length===0?<Title text1={"your"} text2={"cart is empty"}/>:<Title text1={"your"} text2={"cart"}/>}
        
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productdata=products.find((product)=>product._id === item._id)
            return(
              <div key={index} className="py-4 border-t border-b text-gray-700 grid items-center gap-4 grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]">
                <div className="flex items-start gap-5">
                  <img src={productdata.image[0]} alt="" className="w-16 sm:w-20" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productdata.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="text-lg">{currency}{productdata.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border rounded bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e)=>e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id,item.size,Number(e.target.value)) } className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded" type="number" min={1} defaultValue={item.quantity} />
                <img onClick={()=>updateQuantity(item._id,item.size,0)} src={assets.bin_icon} alt="" className="w-5 mr-4 sm:w-7 cursor-pointer hover:bg-amber-200 p-1 rounded"  />
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end my-20"> 
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className="w-full text-end">
            <button onClick={()=>navigate("/place-order")} className="capitalize bg-amber-300 text-black text-sm my-8 px-5 py-3 rounded active:bg-amber-200 cursor-pointer">proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart

// ok