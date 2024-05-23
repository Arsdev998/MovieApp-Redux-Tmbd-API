import React from "react";

import { mobileNav } from "../contants/Navigation";
import { NavLink } from "react-router-dom";
const MobileNav = () => {
  return (
    <section className="lg:hidden h-14 bg-black bg-opacity-60 backdrop-blur-sm fixed bottom-0 w-full z-50">
      <div className="flex items-center justify-between h-full text-neutral-400">
        {mobileNav.map((nav, index) => {
          return (
            <NavLink
              to={nav.href}
              key={index}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${isActive && "text-[#fca305]"}`
              }
            >
              <div className="text-2xl">{nav.icon}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNav;
