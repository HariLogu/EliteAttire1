import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div >
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:justify-around mt-20 text-sm bg-amber-200 "> 

            
            <div>
                <p className="text-xl font-medium mb-2 capitalize">help</p>
                <ul className="flex flex-col gap-1 text-gray-800">
                    <li className="capitalize">shipping</li>
                    <li className="capitalize">refund</li>
                    <li className="capitalize">FAQ</li>
                    <li className="capitalize">Accessibility</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-2 capitalize">contact us</p>
                <ul className="flex flex-col gap-1 text-gray-800">
                    <li className="flex gap-1 items-center"><img src={assets.phone} alt="" className="size-4" />+12-212-233-455</li>
                    <li className="flex gap-1 items-center"><img src={assets.email} alt="" className="size-4" />contactforever@gmail.com</li>
                    <li className="flex items-center"><img src={assets.location} alt="" className="size-4" />Chennai 600001,TamilNadu</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-2 capitalize">stay connected</p>
                <ul className="flex gap-3 text-gray-800">
                    {[assets.facebook,assets.instagram,assets.youtube,assets.twitter].map((item)=>(
                        <img key={item} src={item} className="size-7 cursor-pointer hover:shadow-md shadow-orange-500 rounded-full"/>
                    ))}
                </ul>
            </div>
            
        </div>
        <div className="bg-black text-amber-300">
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2026  forever.com- All Rights Reserved</p>
        </div>
    </div>
  )
}
export default Footer

// ok