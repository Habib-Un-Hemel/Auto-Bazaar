import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <img src="/logo.svg" alt="logo" />
      <ul className="hidden md:flex gap-16">
        <li
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        "
        >
          Home
        </li>
        <li
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        "
        >
          Search
        </li>
        <li
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        "
        >
          New
        </li>
        <li
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary
        "
        >
          Preowned
        </li>
      </ul>
      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton></UserButton>
          <Link to="/profile">
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <Button>Submit Listing</Button>
      )}
    </div>
  );
}

export default Header;
