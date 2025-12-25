import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, MessageSquare, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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

  const headerBg =
    isHomePage && !scrolled && !mobileMenuOpen
      ? "bg-transparent fixed"
      : "bg-white/95 backdrop-blur-md shadow-sm";

  return (
    <header
      className={`top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg} ${
        isHomePage ? "fixed" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-40 py-3 lg:py-2">
        <div className="flex items-center justify-between">
          {/* Logo + Shop Travel */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 w-24 sm:w-32 lg:w-40 font-bold text-lg sm:text-xl">
              <img
                src="/full-logo.png"
                alt="Logo"
                className="logo cursor-pointer w-full h-auto"
                onClick={() => navigate("/")}
              />
            </div>

            {/* Shop Travel Dropdown - Desktop only */}
            <button
              className={`hidden lg:flex items-center gap-1.5 text-sm font-medium transition-colors ${textColor}`}
            >
              Shop travel
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Right Menu */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium">
            <button
              className={`hidden xl:flex items-center gap-2 transition-colors ${textColor}`}
            >
              <span>USD</span>
              <span className="text-xl">🇺🇸</span>
            </button>
            <a
              href="#"
              className={`whitespace-nowrap transition-colors ${textColor}`}
            >
              List your property
            </a>
            <a href="#" className={`transition-colors ${textColor}`}>
              Support
            </a>
            <a href="#" className={`transition-colors ${textColor}`}>
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

            {isAuthenticated ? (
              <Link to="/account">
                <button
                  className={`flex items-center gap-2 p-2 rounded-full transition-colors ${iconHoverBg}`}
                  aria-label="Account"
                >
                  <User
                    className={`w-5 h-5 ${
                      scrolled ? "text-gray-700" : "text-white"
                    }`}
                  />
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <span
                  className={`cursor-pointer transition-colors ${textColor}`}
                >
                  Sign In
                </span>
              </Link>
            )}
          </nav>

          {/* Tablet/Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {/* Sign In / Account - visible on tablet */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <Link to="/account">
                  <User
                    className={`w-6 h-6 ${
                      scrolled ? "text-gray-700" : "text-white"
                    }`}
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <span
                    className={`text-sm font-medium cursor-pointer transition-colors ${textColor}`}
                  >
                    Sign In
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/20 "
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div
                className={`lg:hidden mt-4 pt-4 border-t ${
                  scrolled ? "border-gray-200" : "border-white/20"
                }`}
              >
                <nav className="flex flex-col gap-2 pb-4">
                  <button
                    className={`flex items-center justify-between py-3 px-2 rounded-lg text-left font-medium transition-colors ${
                      scrolled
                        ? "text-gray-800 hover:bg-gray-50"
                        : "hover:bg-white/10"
                    }`}
                  >
                    Shop travel
                    <ChevronDown className="w-5 h-5" />
                  </button>

                  <a
                    href="#"
                    className={`py-2 px-2 rounded-lg transition-colors ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-50"
                        : " hover:bg-white/10"
                    }`}
                  >
                    List your property
                  </a>
                  <a
                    href="#"
                    className={`py-2 px-2 rounded-lg transition-colors ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-50"
                        : " hover:bg-white/10"
                    }`}
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    className={`py-2 px-2 rounded-lg transition-colors ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-50"
                        : " hover:bg-white/10"
                    }`}
                  >
                    Trips
                  </a>
                  <a
                    href="#"
                    className={`py-2 px-2 rounded-lg transition-colors ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-50"
                        : " hover:bg-white/10"
                    }`}
                  >
                    Messages
                  </a>

                  {isAuthenticated ? (
                    <Link
                      to="/account"
                      className={`py-2 px-2 rounded-lg transition-colors ${
                        scrolled
                          ? "text-gray-700 hover:bg-gray-50"
                          : " hover:bg-white/10"
                      }`}
                    >
                      Account
                    </Link>
                  ) : (
                    <div
                      className={`flex flex-col sm:flex-row gap-3 pt-4 mt-2 border-t ${
                        scrolled ? "border-gray-200" : "border-white/20"
                      }`}
                    >
                      <Link to="/login" className="flex-1">
                        <button
                          className={`w-full py-3 px-5 border rounded-lg font-medium transition-colors ${
                            scrolled
                              ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                              : "border-white/40 text-white hover:bg-white/10"
                          }`}
                        >
                          Sign In
                        </button>
                      </Link>
                      <button
                        onClick={() => navigate("/signUp")}
                        className="flex-1 py-3 px-5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}

                  <div
                    className={`py-3 px-2 flex items-center gap-2 text-sm ${
                      scrolled ? "text-gray-700" : ""
                    }`}
                  >
                    <span>🇺🇸 United States</span>
                    <span>• USD</span>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}