import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, LogIn, X } from "lucide-react";

function Header() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shadow-sm px-4 py-3 relative sm:px-6 lg:px-10">
      <div className="flex justify-between items-center">
        {/* Logo + Tagline */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 z-10">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
          />
          <div className="flex flex-col">
            <p className="font-bold text-xl sm:text-2xl md:text-3xl">
              AutoBazar
            </p>
            <p className="text-xs hidden sm:block text-gray-500">
              Fast, Smart Bike Marketplace
            </p>
          </div>
        </Link>

        {/* Desktop Navigation - Only visible on large screens */}
        <ul className="hidden lg:flex gap-10 font-medium absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            <Link to="/search">Search</Link>
          </li>
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            <Link to="/ai-guidance">AI Guidance</Link>
          </li>
          <li className="hover:scale-105 transition-all cursor-pointer hover:text-primary">
            <Link to="/price-prediction">Prediction</Link>
          </li>
        </ul>

        {/* Desktop User Section - Only visible on large screens */}
        <div className="hidden lg:flex items-center gap-4">
          {isSignedIn ? (
            <>
              <UserButton />
              <Link to="/profile">
                <Button className="hover:bg-primary hover:text-white transition-colors">
                  Submit Listing
                </Button>
              </Link>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors">
                  <LogIn size={16} />
                  Sign In
                </Button>
              </SignInButton>
              <Link to="/add-listing">
                <Button
                  variant="outline"
                  className="hover:border-primary hover:text-primary transition-colors"
                >
                  Submit Listing
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile/Medium Menu Button - Visible on small and medium screens */}
        <div className="lg:hidden z-10">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="p-2 focus:outline-none rounded-md hover:bg-gray-100"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Medium Dropdown Menu - Full screen overlay for better UX */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 pt-20 px-6">
          <div className="flex flex-col h-full max-w-md mx-auto">
            {/* User Actions */}
            <div className="space-y-4 mb-8">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <UserButton />
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <Button className="hover:bg-primary hover:text-white transition-colors">
                      Submit Listing
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button
                      className="w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <LogIn size={16} />
                      Sign In
                    </Button>
                  </SignInButton>
                  <Link to="/add-listing" onClick={() => setMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full hover:border-primary hover:text-primary transition-colors"
                    >
                      Submit Listing
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Navigation Links */}
            <div className="space-y-6 py-4">
              <Link
                to="/"
                className="block py-2 text-lg font-medium hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block py-2 text-lg font-medium hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                to="/ai-guidance"
                className="block py-2 text-lg font-medium hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                AI Guidance
              </Link>
              <Link
                to="/price-prediction"
                className="block py-2 text-lg font-medium hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Prediction
              </Link>
            </div>

            {/* Close button at bottom */}
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-auto mb-8 w-full py-3 border-t border-gray-200 text-primary font-medium"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
