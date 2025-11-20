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
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none w-full sm:w-72"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </div>

      <div className="border-t border-gray-700"></div>
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-2">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🏨</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Expedia</h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted partner for finding the perfect accommodation
            worldwide. Book hotels, apartments, and unique stays with
            confidence.
          </p>

          <div className="flex gap-5 mt-5">
            <FaFacebookF
              className="hover:text-white cursor-pointer"
              size={18}
            />
            <FaTwitter className="hover:text-white cursor-pointer" size={18} />
            <FaInstagram
              className="hover:text-white cursor-pointer"
              size={18}
            />
            <FaLinkedinIn
              className="hover:text-white cursor-pointer"
              size={18}
            />
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Press</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">
              Safety Information
            </li>
            <li className="hover:text-white cursor-pointer">
              Cancellation Options
            </li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <FaLocationDot size={20} className="text-blue-400 mt-1" />
              <span>
                123 Travel Street
                <br />
                Cairo, Egypt
              </span>
            </li>

            <li className="flex items-center gap-3">
              <FaPhone size={20} className="text-blue-400" />
              <span>+20 123 456 7890</span>
            </li>

            <li className="flex items-center gap-3">
              <FaEnvelope size={20} className="text-blue-400" />
              <span>support@expedia.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 text-gray-400 text-sm">
        <div className="border-t border-gray-700 w-full"></div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 px-2">
          <span>© 2025 Expedia. All rights reserved.</span>

          <div className="flex flex-wrap gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
