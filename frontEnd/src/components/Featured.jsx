
import Title from "./Title"
import { assets } from "../assets/assets.js"
import {Link} from "react-router-dom"

const Featured = () => {
    
  return (
    <div className="my-10">
        <div className="text-center uppercase text-2xl md:text-3xl">
            <Title text1={"featured"} text2={"collections"}/>
            <div className="mx-5 grid grid-cols-1 md:grid-cols-2 my-5 gap-10">
                <div className="relative" >
                    <img src={assets.men_1} alt=""  />
                    <Link to="/collection" className="absolute hover:bg-amber-200 text-[11px] md:text-[15px] px-3 py-2 rounded-2xl hover:scale-105 transition-all bg-amber-300 bottom-[20px] right-[20px] font-medium">shop now</Link>
                </div>
                <div className="relative" >
                    <img src={assets.women_1} alt=""  />
                    <Link to="/collection" className="absolute hover:bg-amber-200 text-[11px] md:text-[15px] px-3 py-2 rounded-2xl hover:scale-105 transition-all bg-amber-300 bottom-[20px] right-[20px] font-medium">shop now</Link>
                </div>
                <div className="relative" >
                    <img src={assets.kids_2} alt=""  />
                    <Link to="/collection" className="absolute hover:bg-amber-200 text-[11px] md:text-[15px] px-3 py-2 rounded-2xl hover:scale-105 transition-all bg-amber-300 bottom-[20px] right-[20px] font-medium">shop now</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Featured

// ok