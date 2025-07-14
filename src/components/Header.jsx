import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Menu,
  LogIn,
  X,
  ChevronRight,
  Home,
  Search as SearchIcon,
  Star,
  TrendingUp,
} from "lucide-react";

function Header() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu links with icons
  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Search", path: "/search", icon: <SearchIcon size={18} /> },
    { name: "AI Guidance", path: "/ai-guidance", icon: <Star size={18} /> },
    {
      name: "Prediction",
      path: "/price-prediction",
      icon: <TrendingUp size={18} />,
    },
  ];

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-3"
      } px-4 sm:px-6 lg:px-10`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo + Tagline */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 z-10">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <div className="flex flex-col">
            <p className="font-bold text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              AutoBazar
            </p>
            <p className="text-xs hidden sm:block text-gray-500">
              Fast, Smart Bike Marketplace
            </p>
          </div>
        </Link>

        {/* Desktop Navigation - Only visible on large screens */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop User Section - Only visible on large screens */}
        <div className="hidden lg:flex items-center gap-3">
          {isSignedIn ? (
            <>
              <UserButton />
              <Link to="/profile">
                <Button className="bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all rounded-full px-5">
                  Submit Listing
                </Button>
              </Link>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-gray-100 text-gray-700 rounded-full"
                >
                  <LogIn size={16} />
                  Sign In
                </Button>
              </SignInButton>
              <Link to="/add-listing">
                <Button className="bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all rounded-full px-5">
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
            className={`p-2 rounded-full transition-all ${
              menuOpen ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Medium Dropdown Menu - Slide down animation */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white shadow-xl z-40 animate-slideDown">
          <div className="flex flex-col max-w-md mx-auto px-6 py-6">
            {/* User Actions */}
            <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserButton />
                    <span className="font-medium text-gray-800">
                      Your Account
                    </span>
                  </div>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full"
                    >
                      Submit Listing
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">
                    Sign in to submit a listing or save favorites
                  </p>
                  <div className="flex gap-3">
                    <SignInButton mode="modal">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex flex-1 items-center justify-center gap-2 hover:bg-gray-50"
                        onClick={() => setMenuOpen(false)}
                      >
                        <LogIn size={16} />
                        Sign In
                      </Button>
                    </SignInButton>
                    <Link
                      to="/add-listing"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white"
                      >
                        Submit Listing
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between py-3 px-2 rounded-lg ${
                    isActive(link.path)
                      ? "bg-primary/5 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-full ${
                        isActive(link.path) ? "bg-primary/10" : "bg-gray-100"
                      }`}
                    >
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.name}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
              ))}
            </nav>

            {/* Close button at bottom */}
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-6 py-3 text-primary font-medium flex justify-center items-center gap-2 hover:bg-primary/5 rounded-lg transition-colors"
            >
              Close Menu
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Add this animation to your global CSS or tailwind config
// @keyframes slideDown {
//   from { transform: translateY(-10px); opacity: 0; }
//   to { transform: translateY(0); opacity: 1; }
// }
// .animate-slideDown { animation: slideDown 0.2s ease-out forwards; }

export default Header;
