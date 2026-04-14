import React, { useContext,useState,useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";
import axios from "axios"


const Orders = () => {

  const {backendUrl,token,currency}=useContext(ShopContext);
  const [orderData,setOrderData]=useState([])

  async function loadOrderData(){
    try {
      if(!token){
        return null;
      }

      const response=await axios.post(backendUrl + "/api/order/userorders",{},{headers:{token}})
      if(response.data.success){
        let allOrdersItem=[];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item["status"]=order.status
            item["payment"]=order.payment
            item["paymentMethod"]=order.paymentMethod
            item["date"]=order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className="border-t pt-15">
      <div className="text-2xl uppercase">
        <Title text1={"my"} text2={"orders"}/>
      </div>
      <div className="mt-10">
        {
          orderData.map((item,index)=>(
            <div key={index} className="border-t border-gray-400 rounded py-5 flex border-b md:justify-between text-gray-700 flex-col md:flex-row md:items-center mt-5">

              <div className="flex items-start text-sm gap-6">
                <img src={item.image[0]} alt="" className="w-16 sm:w-20" />
                <div className="">
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center mt-2 text-base text-gray-700 gap-3">
                    <p className="text-lg font-medium">{currency}{item.price}.00</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>size: {item.size} </p>
                  </div>
                  <p className="mt-2">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-2">Payment Method: <span className="text-gray-400">{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className="flex justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p className="border bg-green-500 size-3 rounded-full"></p>
                  <p className="capitalize text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-2 py-1 rounded text-sm border-gray-400 hover:bg-black hover:text-white transition-all ease-in-out active:bg-gray-500 capitalize cursor-pointer ">track order</button>
              </div>
          </div>
          ))
        }
        
      </div>
      
    </div>
  )
}
export default Orders

// ok,check after backend connect