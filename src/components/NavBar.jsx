import React from "react";
import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav className="h-13 bg-cyan-700 flex justify-center items-center gap-6">
      <NavLink className="cursor-pointer hover:underline" to={"/"}>
        Login
      </NavLink>
      <NavLink className="cursor-pointer hover:underline" to={"/register"}>
        Register
      </NavLink>
      <NavLink className="cursor-pointer hover:underline" to={"/todo"}>
        Todo
      </NavLink>
    </nav>
  );
}

export default NavBar;
