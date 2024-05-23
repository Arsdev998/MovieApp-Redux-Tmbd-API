import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import profile from "../assets/user.png";
import { IoMdSearch } from "react-icons/io";
import { navigation } from "../contants/Navigation.jsx";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("20%")?.join("");
  console.log("remove space", removeSpace);
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full bg-black h-16 bg-opacity-75 z-50">
      <div className="container mx-auto px-4 flex items-center h-full">
        <NavLink to={"/"}>
          <img src={logo} alt="" width={120} />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-x-1 ml-5">
          {navigation.map((nav, index) => {
            return (
              <div className="" key={index}>
                <NavLink
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${isActive && "text-primary"}`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-x-4">
          <form className="flex items-center gap-x-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden md:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-[30px] text-white" type="submit">
              <IoMdSearch />
            </button>
          </form>

          <div className="h-8  w-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
            <img src={profile} className="w-full h-full " alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
