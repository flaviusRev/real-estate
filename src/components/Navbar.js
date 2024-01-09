/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, IconButton, Menu, MenuItem } from "@material-tailwind/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../assets/revLogo.png";
import { useBookedProperties } from "../context/BookedPropertiesContext";

const Navbar = () => {
  const { bookedProperties } = useBookedProperties();

  const handlePropertyClick = (property) => {
    console.log(property);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-semibold text-gray-500 text-lg">
                  RevEstate
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3 ">
            <Link
              to="/login"
              className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            >
              Sign Up
            </Link>

            <div className="relative group">
              <IconButton
                size="regular"
                color="green"
                className="text-white"
                ripple="light"
              >
                <ShoppingCartIcon />
                {bookedProperties.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {bookedProperties.length}
                  </span>
                )}
              </IconButton>
              <div className="absolute right-0 z-10 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                {bookedProperties.length > 0 &&
                  bookedProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => handlePropertyClick(property)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {property.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden mobile-menu">
        <ul className="">{/* Add mobile menu items */}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
