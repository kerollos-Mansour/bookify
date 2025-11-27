import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, MessageSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handelScroll = () => {
      if (!isHomePage) {
        setScrolled(true);
        return;
      }
      setScrolled(window.scrollY > 20);
    };
    handelScroll();
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, [isHomePage]);

  const textColor = scrolled
    ? "text-gray-700 hover:text-gray-900"
    : "text-white hover:text-gray-200";
  const iconHoverBg = scrolled ? "hover:bg-gray-100" : "hover:bg-white/20";
  const borderColor = scrolled ? "border-gray-200" : "border-white/20";

  const headerBg =
    isHomePage && !scrolled
      ? "bg-transparent fixed"
      : " bg-white/95 backdrop-blur-md shadow-sm ";
  return (
    <header
      className={` top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg} ${
        isHomePage ? "fixed" : ""
      }`}
    >
      <div className="container mx-auto px-40 py-4 ">
        <div className="flex items-center justify-between">
          {/* Logo + Shop Travel */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 w-30 font-bold text-xl">
              <img
                src="./logo.svg"
                alt=""
                className="logo"
                onClick={() => navigate("/")}
              />
            </div>

            {/* Shop Travel Dropdown - Desktop only */}
            <button
              className={`hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors ${textColor}`}
            >
              Shop travel
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Right Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              className={`flex items-center gap-2 transition-colors ${textColor}`}
            >
              <span>USD</span>
              <span className="text-xl">United States</span>
            </button>
            <a
              href="#"
              className={`text-gray-700 hover:text-gray-900 transition-colors ${textColor}`}
            >
              List your property
            </a>
            <a
              href="#"
              className={`text-gray-700 hover:text-gray-900 transition-colors ${textColor}`}
            >
              Support
            </a>
            <a
              href="#"
              className={`${textColor}text-gray-700 hover:text-gray-900 transition-colors`}
            >
              Trips
            </a>

            {/* Messages Icon Button */}
            <button
              className={`p-2 rounded-full transition-colors ${iconHoverBg}`}
            >
              <MessageSquare
                className={`w-5 h-5 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              />
            </button>
            <Link to="/login">
              <a
                className={`text-gray-700 hover:text-gray-900 transition-colors ${textColor}`}
              >
                Sign In
              </a>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 pb-4">
              <button className="flex items-center justify-between py-3 text-left font-medium text-gray-800">
                Shop travel
                <ChevronDown className="w-5 h-5" />
              </button>

              <a href="#" className="py-2 text-gray-700 hover:text-gray-900">
                List your property
              </a>
              <a href="#" className="py-2 text-gray-700 hover:text-gray-900">
                Support
              </a>
              <a href="#" className="py-2 text-gray-700 hover:text-gray-900">
                Trips
              </a>

              <div className="py-3 text-gray-700 flex items-center gap-2">
                <span className="text-lg">United States</span>
                <span>Currency: USD</span>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 py-3 px-5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Sign In
                </button>
                <button className="flex-1 py-3 px-5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
