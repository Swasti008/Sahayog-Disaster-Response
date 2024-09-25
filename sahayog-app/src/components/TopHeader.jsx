// src/components/Header.jsx
import React from "react";
import { Button } from "@mui/material";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white  py-1 px-6 shadow-xl">
      <div className="flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img src={Logo} className="h-16" />
        </div>
        <Link to="/">
          <Button variant="ghost" className="text-white">
            HOME
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
