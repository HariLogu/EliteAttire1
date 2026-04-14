import react, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  function onChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  }

  function initPay(order) {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorPay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.RazorPay(options);
    rzp.open();
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        // userId,//
        address: formData,
        items: orderItems,
        amount: getCartAmount() + Number(delivery_fee),
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorPay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );

          if (responseRazorPay.data.success) {
            initPay(responseRazorPay.data.order);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-10 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-sm sm:text-lg my-3">
          <Title text1={"delivery"} text2={"information"} />
        </div>
        <div className="flex gap-3 text-sm sm:text-lg">
          <input
            name="firstName"
            onChange={onChangeHandler}
            required
            value={formData.firstName}
            type="text"
            placeholder="first name"
            className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            required
            value={formData.lastName}
            type="text"
            placeholder="last name"
            className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          required
          value={formData.email}
          type="email"
          placeholder="email"
          className="border border-gray-400 rounded  py-1.5 px-3.5 w-full focus:outline-none text-sm sm:text-lg"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          required
          value={formData.street}
          type="text"
          placeholder="street"
          className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none text-sm sm:text-lg"
        />
        <div className="flex gap-3 text-sm sm:text-lg">
          <input
            onChange={onChangeHandler}
            name="city"
            required
            value={formData.city}
            type="text"
            placeholder="city"
            className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            required
            value={formData.state}
            type="text"
            placeholder="state"
            className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none"
          />
        </div>
        <div className="flex gap-3 text-sm sm:text-lg">
          <input
            onChange={onChangeHandler}
            name="zipCode"
            required
            value={formData.zipCode}
            type="tel"
            placeholder="zipcode"
            className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            required
            value={formData.country}
            type="text"
            placeholder="country"
            className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-5 grid-rows-5 gap-3 text-sm sm:text-lg">
          <input
            onChange={onChangeHandler}
            name="countryCode"
            value="+91"
            type="tel"
            required
            placeholder="country code"
            className="border border-gray-400 rounded capitalize col-span-2 py-1.5 px-3.5 w-full focus:outline-none"
          />
          <input
            onChange={onChangeHandler}
            name="phone"
            type="tel"
            required
            value={formData.phone}
            placeholder="phone"
            className="border border-gray-400 rounded capitalize py-1.5 px-3.5 w-full focus:outline-none col-span-3"
          />
        </div>
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"payment"} text2={"method"} />

          {/* payment method selection */}
          <div className="flex gap-2 flex-col lg:flex-row mt-3">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center my-2 rounded cursor-pointer gap-3 border p-2 px-3 ${
                method === "stripe" ? "border-green-600 border-2" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center my-2 rounded cursor-pointer gap-3 border p-2 px-3 ${
                method === "razorpay" ? "border-green-600 border-2" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center my-2 rounded cursor-pointer gap-3 border p-2 px-3 ${
                method === "cod" ? "border-green-600 border-2" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="capitalize text-gray-500 text-sm font-medium ">
                cash on delivery
              </p>
            </div>
          </div>
          <div className="w-full mt-8">
            <button
              type="submit"
              className="uppercase bg-black text-white px-10 py-3 text-sm rounded hover:scale-110 cursor-pointer active:bg-gray-600 transition-all ease-in-out"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;


// ok