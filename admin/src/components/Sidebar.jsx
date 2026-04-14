import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
    return (
        <div className="md:w-[17%] w-[60px] transition-all min-h-screen border-r-2 border-gray-300">
            <div className="flex flex-col gap-4 pt-6 pl-[10%] text-[15px]">
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        `flex items-center md:justify-start justify-center gap-3 border border-[#c586a5] border-r-0 px-3 py-2 rounded-md ${isActive ? "bg-[#ffebf5]" : ""
                        }`
                    }
                >
                    <img className="size-5 flex-shrink-0" src={assets.add_icon} alt="" />
                    <p className="capitalize hidden md:block">add items</p>
                </NavLink>
                <NavLink
                    to="/products"
                    className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-md `}
                >
                    <img
                        className="size-5 cursor-pointer"
                        src={assets.order_icon}
                        alt=""
                    />
                    <p className="capitalize hidden md:block">list items</p>
                </NavLink>
                <NavLink
                    to="/orders"
                    className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-md`}
                >
                    <img
                        className="size-5 cursor-pointer"
                        src={assets.order_icon}
                        alt=""
                    />
                    <p className="capitalize hidden md:block">orders</p>
                </NavLink>
            </div>
        </div>
    );
};
export default Sidebar;

// ok
