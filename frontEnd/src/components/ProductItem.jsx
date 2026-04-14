import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom"



const ProductItem = ({id,image,name,price,description}) => {

    const {currency}=useContext(ShopContext)

  return (
    <div className=" rounded px-3 py-3 border flex flex-col gap-3  border-amber-200 shadow-xl h-full" >
        <Link className="overflow-hidden" to={`/product/${id}`}>
            <img src={image[0]} alt="" className="hover:scale-110 transition-all" />
        </Link>
        <div className="flex flex-col items-center flex-grow">
            <p className="capitalize font-semibold">{name}</p>
            <p className="capitalize text-[13px]">{description}</p>
        </div>
        <div className="flex justify-center items-center w-full">
            <p className="font-semibold md:text-base text-[12px]">{currency}{price}.00</p>
        </div>
    </div>
  )
}
export default ProductItem

// ok