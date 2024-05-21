import React from "react";

import { mobileNav } from "../contants/Navigation";
import { NavLink } from "react-router-dom";
const MobileNav = () => {
  return (
    <section className="lg:hidden h-14 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full">
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
