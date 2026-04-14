// import {useState,useEffect} from "react"
// import axios from "axios"
// import {backendURL, currency} from "../App"
// import {toast} from "react-toastify"
// import { assets } from "../assets/assets"

// const Orders = ({token}) => {
//   const [orders,setOrders]=useState([]);

//   async function fetchAllOrders(){
//     try {
//       if(!token){
//         return null;
//       }

//       const response=await axios.post(backendURL + "/api/order/list",{},{headers:{token}})
//       if(response.data.success){
//         setOrders(response.data.orders)
//       }
//       else{
//         toast.error(response.data.message)
//       }
      
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     fetchAllOrders()
//   },[token])

//   return (
//       <div>
//         <h3>order page</h3>
//         <div>
//           {
//             orders.map((order,index)=>(
//               <div key={index}>
//                 <img src={assets.parcel_icon} alt="" />
//                 <div>
//                   <div>
//                     {
//                       order.items.map((item,index)=>{
//                         if(index === order.items.length-1){
//                           return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
//                         }
//                         else{
//                           return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
//                         }
//                       })
//                     }
//                   </div>
//                   <p>{order.address.firstName + " " + order.address.lastName}</p>
//                   <div>
//                     <p>{order.address.street + ","}</p>
//                     <p>{order.address.city + ", " +order.address.state + ", "+order.address.country + ", "+ order.address.zipCode + ", "}</p>
//                   </div>
//                   <p>+91 {order.address.phone}</p>
//                 </div>
//                 <div>
//                   <p>Items : {order.items.length}</p>
//                   <p>Method : {order.paymentMethod}</p>
//                   <p>Payment : {order.payment ? "Done" : "Pending"}</p>
//                   <p>Date : {new Date(order.date).toLocaleDateString()}</p>
//                 </div>
//                 <p>{currency}{order.amount}</p>
//                 <select name="" id="">
//                   <option value="Order Placed">Order Placed</option>
//                   <option value="Packing">Packing</option>
//                   <option value="Shipping">Shipping</option>
//                   <option value="Out Of Delivery">Out Of Delivery</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//   )
// }
// export default Orders

import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  async function fetchAllOrders() {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendURL + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("from orders");
    }
  }
  async function statusHandler(event,orderId) {
    try {
      const response = await axios.post(
        backendURL + "/api/order/status",
        {orderId,status:event.target.value},
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6"
          >
            {/* Icon */}
            <div className="flex justify-center items-start">
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-12 h-12"
              />
            </div>

            {/* Order Details */}
            <div className="flex-1 space-y-2 text-sm">
              {/* Items */}
              <div className="text-gray-700">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}{" "}
                    <span className="font-medium">
                      ({item.size})
                    </span>
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </div>

              {/* Address */}
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="text-gray-500">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipCode}
                </p>
              </div>

              <p className="text-gray-600">
                📞 +91 {order.address.phone}
              </p>
            </div>

            {/* Order Info */}
            <div className="text-sm space-y-1 min-w-[180px]">
              <p>
                <span className="font-medium">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={`${
                    order.payment
                      ? "text-green-600"
                      : "text-red-500"
                  } font-medium`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Price & Status */}
            <div className="flex flex-col justify-between items-end gap-3">
              <p className="text-lg font-semibold text-gray-800">
                {currency}
                {order.amount}
              </p>

              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out Of Delivery">Out Of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

// ok