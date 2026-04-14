import { NavLink } from "react-router-dom"

const Links = () => {
  return (
    <div className="hidden md:block">
      <ul className="flex capitalize gap-6 lg:gap-8 justify-center my-4 font-medium text-sm lg:text-base">
      
        {["home", "collection", "about", "contact"].map((item) => (
          <NavLink
            key={item}
            to={item === "home" ? "/" : `/${item}`}
            className="flex flex-col items-center gap-1 group"
          >
            <p>{item}</p>
            <hr className="w-1/2 h-[2px] bg-yellow-300 text-yellow-300 rounded transition hidden" />
          </NavLink>
        ))}

      </ul>
    </div>
  )
}

export default Links

// ok