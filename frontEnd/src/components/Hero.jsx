import { assets } from "../assets/assets"
import {Link} from "react-router-dom"
const Hero = () => {
  return (
    <div className="bg-amber-200 flex justify-center md:justify-between py-10 md:pl-20 w-full">
        {/* left */}
        <div className="w-1/2 capitalize flex flex-col gap-3 justify-center items-center">
            <p className="text-left flex tracking-tighter uppercase">upto 15% discount</p>
            <h1 className="md:text-6xl text-4xl font-bold">checkout the best fashion style</h1>
            <Link to={"/collection"} className="border uppercase font-medium mt-5 text-md px-3 py-1 rounded hover:scale-105 cursor-pointer transition-all">shop now</Link>
        </div>
        {/* right */}
        <div className="w-1/2 hidden md:block">
            <img src={assets.hero} alt="" className="w-[75%]" />
        </div>
    </div>
  )
}
export default Hero

// ok