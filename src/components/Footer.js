/** @format */

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#002233] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">RevEstate</h2>
            <p className="text-[#aaaaaa] text-sm">
              A great platform to buy, sell and rent your properties without any
              agent or commissions.
            </p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  About us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Useful Links
            </h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Terms of Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Listing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#aaaaaa] hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Details
            </h3>
            <ul>
              <li className="mb-2 text-[#aaaaaa]">
                C/54 Northwest Freeway, Suite 558, Houston, USA 485
              </li>
              <li className="mb-2 text-[#aaaaaa]">contact@example.com</li>
              <li className="text-[#aaaaaa]">+152 534-468-854</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#334455] my-4  pt-4 text-center text-[#aaaaaa] text-sm">
        © 2023 RevEstate.
      </div>
    </footer>
  );
};

export default Footer;
