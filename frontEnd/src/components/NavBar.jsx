import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [dark,setDark]=useState(true);
  const [light,setLight]=useState(false);
  const {
    search,
    setSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  function logout() {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  }

  return (
    <div className={``}>
    <div className={`px-4 py-3 border-b `}>
      {/* Top Row */}
      <div className="flex justify-between gap-2 items-center">
        {/* Logo */}
        <NavLink to="/">
          <img src={assets.logo} alt="" className="w-25 md:w-25 rounded" />
        </NavLink>

        {/* Hamburger (mobile only) */}
        {/* <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          <img src={assets.menu_icon} alt="" className="w-8" />
        </div> */}

        {/* search */}
        <div className=" flex items-center bg-amber-200 rounded w-[220px] md:w-[400px] mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products"
            className="w-full px-3 py-1 md:py-2 text-sm rounded focus:outline-none bg-white border-[1.5px] border-amber-200"
          />
          <img
            src={assets.search}
            className="md:size-4 size-2 md:m-3 m-2 cursor-pointer"
          />
        </div>

        {/* ham */}
        <div
          className="md:hidden cursor-pointer "
          onClick={() => setOpen(!open)}
        >
          <img src={assets.menu_icon} alt="" className="w-7" />
        </div>

        {/* Right icons (desktop only) */}
        <div className="hidden md:flex gap-3">
          <div className="group relative">
            <div className="p-1 border-2 rounded relative border-amber-200 hover:bg-zinc-100 cursor-pointer">

              {/* user icon */}
              <Link to={"/login"}>
                <img
                  src={assets.user}
                  onClick={() => (token ? null : navigate("/login"))}
                  alt=""
                  className="w-5 "
                />
              </Link>
            </div>

            {/* dropdown */}
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 bg-amber-100 text-sm">
                <div className="flex flex-col gap-1 w-28 py-2 px-5 rounded">
                  <Link to="/profile" className="cursor-pointer text-gray-500 hover:text-black w-auto capitalize">
                    my profile
                  </Link>
                  <Link
                    to="/orders"
                    className="cursor-pointer text-gray-500 hover:text-black w-auto capitalize"
                  >
                    orders
                  </Link>
                  <Link
                    onClick={logout}
                    className="cursor-pointer text-gray-500 hover:text-black w-auto capitalize"
                  >
                    logout
                  </Link>
                </div>
              </div>
            )}
          </div>

          

          {/* cart icon */}
          <Link
            to="/cart"
            className="p-1 border-2 rounded relative border-amber-200 hover:bg-zinc-100 cursor-pointer"
          >
            <img src={assets.shoppingcart} className="size-5" />
            <p className="absolute text-[8px] bg-amber-300 font-medium rounded px-[2px] bottom-[1px] right-[-5px] font-white">
              {getCartCount()}
            </p>
          </Link>

          <img onClick={()=>{setDark(false);setLight(true)}} src={assets.dark_mode} alt="" className={`${dark?"block":"hidden"} size-7 p-1 cursor-pointer hover:bg-gray-100 rounded transition-all`} />
          <img onClick={()=>{setDark(true);setLight(false)}} src={assets.light_mode} alt="" className={`${light?"block":"hidden"} size-7 hover:bg-gray-100 rounded transition-all cursor-pointer`} />

        </div>
      </div>

      {/* Search */}

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-center capitalize">
          {["home", "collection", "about", "contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "home" ? "/" : `/${item}`}
              className="flex flex-col items-center gap-1 p-1.5 hover:bg-gray-200 group"
              onClick={() => setOpen(false)}
            >
              <p>{item}</p>
            </NavLink>
          ))}

          {/* Icons in mobile */}
          <div className="flex justify-center gap-4 mt-3">
            <div className="flex gap-3">
              <div className="group relative">
                <div
                    onClick={() => {
                      setOpen(false);
                      token ? null : navigate("/login");
                    }}
                    className="p-1 border-2 rounded border-amber-200 hover:bg-zinc-100 cursor-pointer"
                  >
                    <img src={assets.user} alt="" className="w-5" />
                  </div>
                <div className="group-hover:block hidden absolute dropdown-menu right-0 bg-amber-100 text-sm">
                  <div className="flex flex-col gap-1 w-28 py-2 px-5 rounded">
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="cursor-pointer text-gray-500 hover:text-black w-auto capitalize"
                    >
                      my profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setOpen(false)}
                      className="cursor-pointer text-gray-500 hover:text-black w-auto capitalize"
                    >
                      orders
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {setOpen(false);logout()}}
                      className="cursor-pointer text-gray-500 hover:text-black w-auto capitalize"
                    >
                      logout
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link
                to="/cart"
                className="p-1 border-2 rounded relative border-amber-200 hover:bg-zinc-100 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <img src={assets.shoppingcart} className="size-5" />
                <p className="absolute text-[8px] bg-amber-300 font-medium rounded px-[2px] bottom-[1px] right-[-5px]">
                  {getCartCount()}
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default NavBar;


// check
