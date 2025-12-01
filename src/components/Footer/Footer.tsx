import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300 pt-16 pb-10">
      <div className="max-w-6xl mx-auto text-center mb-14 px-2">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-400 mb-6">
          Get the latest deals and travel inspiration delivered to your inbox
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72 transition-all"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto font-medium transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      <div className="border-t border-gray-700"></div>
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-2">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/white-logo.png"
              alt="Bookify Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Your trusted partner for finding the perfect accommodation
            worldwide. Book hotels, apartments, and unique stays with
            confidence.
          </p>

          <div className="flex gap-4 mt-5">
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors group"
            >
              <FaFacebookF
                className="text-gray-400 group-hover:text-white transition-colors"
                size={16}
              />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors group"
            >
              <FaTwitter
                className="text-gray-400 group-hover:text-white transition-colors"
                size={16}
              />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors group"
            >
              <FaInstagram
                className="text-gray-400 group-hover:text-white transition-colors"
                size={16}
              />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors group"
            >
              <FaLinkedinIn
                className="text-gray-400 group-hover:text-white transition-colors"
                size={16}
              />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">Company</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">
              About Us
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Careers
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Press
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Blog
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">Support</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">
              Help Center
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Safety Information
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Cancellation Options
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Contact Us
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">Contact</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <FaLocationDot
                size={20}
                className="text-blue-400 mt-1 flex-shrink-0"
              />
              <span className="leading-relaxed">
                123 Travel Street
                <br />
                Cairo, Egypt
              </span>
            </li>

            <li className="flex items-center gap-3">
              <FaPhone size={20} className="text-blue-400 flex-shrink-0" />
              <span>+20 123 456 7890</span>
            </li>

            <li className="flex items-center gap-3">
              <FaEnvelope size={20} className="text-blue-400 flex-shrink-0" />
              <span>support@bookify.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 text-gray-400 text-sm">
        <div className="border-t border-gray-700 w-full"></div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 px-2">
          <span>© 2025 Bookify. All rights reserved.</span>

          <div className="flex flex-wrap gap-6 justify-center sm:justify-end">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
