import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Layout() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false)

  const toggleShowMenu = () => {
    setShowBurgerMenu((prev) => !prev);
  };

  return (
    <div className="flex h-full relative">
      <button className={`absolute bg-primary lg:hidden text-white font-bold text-4xl p-3 rounded-sm m-4 z-50 transition-all duration-300 ${showBurgerMenu && "rotate-180"}`} onClick={toggleShowMenu}>
        <RxHamburgerMenu />
      </button>
      <div
        className={`lg:static fixed top-0 left-0 h-full w-[300px] lg:translate-x-0 transform transition-transform duration-300 ${showBurgerMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
