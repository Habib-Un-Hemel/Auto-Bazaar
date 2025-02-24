import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    
    <div className="flex justify-between items-center shadow-sm p-5">
      <img src="/logo.svg" alt="logo" />
      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        ">Home</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        ">Search</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        ">New</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        ">Preowned</li>
      </ul>
      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton></UserButton>
          <button>Submit Listing</button>
        </div>
      ) : (
        <button>Submit Listing</button>
      )}
    </div>
  );
}

export default Header;
