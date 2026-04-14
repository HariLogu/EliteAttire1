import { useEffect, useState } from "react";
import { backendURL, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  async function fetchList() {
    try {
      const response = await axios.get(backendURL + "/api/product/products");
      if (response.data.success) setList(response.data.products);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  async function removeProduct(id) {
    try {
      const response = await axios.delete(
        backendURL + `/api/product/remove/${id}`,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="ml-5">
      <p className="capitalize my-5">all products list</p>
      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm capitalize rounded">
          <b>image</b>
          <b>name</b>
          <b>category</b>
          <b>price</b>
          <b className="text-center">action</b>
        </div>
        {/* product list */}
        {list.map((item, index) => (
          <div
            key={index}
            className="border relative rounded-lg p-3 md:p-2 flex flex-col md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 md:gap-2 items-start md:items-center shadow-sm"
          >
            {/* Top section (mobile) */}
            <div className="flex items-center gap-3 w-full">
              <img
                src={item.image[0]}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex flex-col">
                <p className="font-medium md:hidden text-sm md:text-base">{item.name}</p>
                <p className="text-xs text-gray-800 md:hidden">
                  {item.category}
                </p>
              </div>
              
            </div>
            <div className="flex text-center justify-between items-center md:hidden">
              <p className="text-sm text-center md:text-base font-medium">
                {currency}
                {item.price}
              </p>
              
              {/* <img  src={assets.bin_icon} alt="" className="size-5 cursor-pointer hover:bg-amber-200 rounded p-1" /> */}
              
            
              </div>
              <p onClick={() => removeProduct(item._id)} className="text-red-500 absolute right-2 -top-1 md:hidden cursor-pointer">x</p>

            {/* Desktop fields */}
            <p className="hidden md:block">{item.name}</p>
            <p className="hidden md:block">{item.category}</p>
            <p className="text-sm hidden md:block md:text-base font-medium">
              {currency}
              {item.price}
            </p>

            {/* Action */}
            <button
              onClick={() => removeProduct(item._id)}
              className="hidden md:flex px-3 py-1 text-sm rounded justify-center"
            >
              <img src={assets.bin_icon} alt="" className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;

// ok
