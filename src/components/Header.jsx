import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

function Header() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shadow-sm px-4 py-3 relative md:ml-10 md:mr-10  ">
      <div className="flex justify-between items-center max-h-20">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
          <p className="font-bold text-sm md:text-base hidden md:inline">
            - Fast, Smart Bike Rentals
          </p>
        </div>

        {/* Desktop Navigation - Centered */}
        <ul className="hidden md:flex gap-12 font-medium absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Home
          </li>
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Search
          </li>
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            New
          </li>
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Preowned
          </li>
        </ul>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            <>
              <UserButton />
              <Link to="/profile">
                <Button>Submit Listing</Button>
              </Link>
            </>
          ) : (
            <Button>Submit Listing</Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          {/* Submit Listing Button on Top */}
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <UserButton />
              <Link to="/profile">
                <Button className="w-full">Submit Listing</Button>
              </Link>
            </div>
          ) : (
            <Button className="w-full">Submit Listing</Button>
          )}

          {/* Mobile Menu Items */}
          <div className="flex flex-col gap-2 mt-2 font-medium">
            <p className="cursor-pointer hover:text-primary">Home</p>
            <p className="cursor-pointer hover:text-primary">Search</p>
            <p className="cursor-pointer hover:text-primary">New</p>
            <p className="cursor-pointer hover:text-primary">Preowned</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
