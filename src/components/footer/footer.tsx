import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { useTheme } from "../../context/themeContext";
import { Link } from "react-router-dom";
export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-slate-50 dark:bg-[#020617] text-slate-600 dark:text-gray-400 pt-20 pb-10 border-t border-slate-200 dark:border-gray-900 transition-colors duration-500 px-4 md:px-8">
      {/* Premium Newsletter Section */}
      <div className="max-w-6xl mx-auto mb-20 px-4">
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

          <h2 className="text-2xl md:text-3xl font-black mb-3 text-slate-900 dark:text-white tracking-tight">
            Elevate Your Travel Game
          </h2>
          <p className="text-slate-500 dark:text-gray-400 mb-8 max-w-md mx-auto font-medium leading-relaxed">
            Get the latest deals and travel inspiration delivered to your inbox with our curated newsletter.
          </p>

          <form className="flex flex-col sm:flex-row justify-center gap-3 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80 transition-all placeholder:text-slate-400 font-medium"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl w-full sm:w-auto font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 px-4">
        {/* Brand Column - Spans 2 columns on mobile */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-block mb-6 group">
            <img
              src={theme === "dark" ? "/white-logo.png" : "/full-logo.png"}
              alt="Bookify Logo"
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-8 font-medium max-w-xs">
            Your trusted partner for finding the perfect accommodation
            worldwide. Book hotels, apartments, and unique stays with
            confidence.
          </p>

          <div className="flex gap-3">
            {[
              { icon: FaFacebookF, label: "Facebook", color: "hover:bg-blue-600" },
              { icon: FaTwitter, label: "Twitter", color: "hover:bg-sky-500" },
              { icon: FaInstagram, label: "Instagram", color: "hover:bg-pink-600" },
              { icon: FaLinkedinIn, label: "LinkedIn", color: "hover:bg-blue-700" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 flex items-center justify-center transition-all shadow-sm hover:-translate-y-1 group ${social.color}`}
              >
                <social.icon
                  className="text-slate-500 dark:text-gray-400 group-hover:text-white transition-colors"
                  size={16}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Company Column */}
        <div className="col-span-1">
          <h3 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest px-1 border-l-2 border-blue-500">Company</h3>
          <ul className="space-y-4 text-slate-500 dark:text-gray-400 font-semibold text-sm">
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              Careers
            </li>
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              Press
            </li>
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              Blog
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="col-span-1">
          <h3 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest px-1 border-l-2 border-blue-500">Support</h3>
          <ul className="space-y-4 text-slate-500 dark:text-gray-400 font-semibold text-sm">
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              Help Center
            </li>
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              Safety Information
            </li>
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              Cancellation Options
            </li>
            <li className="hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors px-1">
              <Link to="/contactUs">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column - Spans 2 columns on mobile */}
        <div className="col-span-2 md:col-span-1 pt-4 md:pt-0 border-t border-slate-200 dark:border-white/5 md:border-none">
          <h3 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest px-1 border-l-2 border-blue-500">Contact</h3>
          <ul className="space-y-5 text-slate-500 dark:text-gray-400 text-sm font-semibold">
            <li className="flex items-start gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                <FaLocationDot size={14} />
              </div>
              <span className="leading-relaxed">
                123 Travel Street, Cairo, Egypt
              </span>
            </li>

            <li className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                <FaPhone size={14} />
              </div>
              <span>+20 123 456 7890</span>
            </li>

            <li className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                <FaEnvelope size={14} />
              </div>
              <span className="truncate">support@bookify.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/10 text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-8">
          <span>© 2025 Bookify. All rights reserved.</span>

          <div className="flex flex-wrap gap-8 justify-center sm:justify-end">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors relative group">
              Cookie Policy
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
