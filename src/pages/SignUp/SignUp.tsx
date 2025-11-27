import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    country: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData);
    // Add your signup logic here
    alert("Signup successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Image with Branding */}
        <div className="relative hidden md:block h-[700px] lg:h-[800px] rounded-2xl overflow-hidden shadow-2xl group order-2">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-blue-600/20 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex items-center justify-center ">
            <div className="text-center px-8 ">
              <div className="img flex flex-row items-center">
                <img src="logoItSelf.png" className="w-20 h-20 mb-4"></img>
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Bookify.
                </h1>
              </div>
              <p className="text-xl lg:text-2xl font-semibold text-gray-800 mt-4">
                Join us and discover amazing places.
              </p>
            </div>
            {/*             <div className="text-center px-8 flex flex-row items-center">
              <img src="logoItSelf.png" className="w-20 h-20 mb-4"></img>
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Bookify.
              </h1>
            </div> */}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md mx-auto order-1 md:order-2">
          <div className="bg-white/80  rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Join us today and start your journey!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phoneNo"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone No
                </label>
                <input
                  id="phoneNo"
                  name="phoneNo"
                  type="tel"
                  placeholder="With Country Code"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
                />
              </div>

              {/* Country Field */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Country Name"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
                />
              </div>

              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="6+ characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <p className="text-sm text-gray-600 text-center">
                By signing up you agree to{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
                >
                  terms and conditions
                </a>{" "}
                at zoho.
              </p>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/30 text-lg"
              >
                Register
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 text-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
