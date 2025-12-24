import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PageTransition from "../../components/pageTransition/pageTransition";
import { useDispatch } from "react-redux";
import { LoginRequest } from "types/auth.type";
import { setCredentials } from "../../store/slices/authSlice";
import { useLoginMutation } from "../../store/api/auth.api";

type Inputs = {
  userName: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      // call API
      const result = await login(data).unwrap();
      // 2. Update Redux Store & LocalStorage (handled by slice)
      // Note: result.data contains user and accessToken based on your interface
      dispatch(
        setCredentials({
          user: result.data.user,
          accessToken: result.data.accessToken,
        })
      );
      navigate("/");
    } catch (err: any) {
      console.log("Login Fauled:", err);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image with Branding */}
          <div className="relative hidden md:block h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-blue-600/20 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-background/40 backdrop-blur-md z-20 flex items-center justify-center">
              {/* logo */}
              <div className="text-center px-8 flex flex-row items-center">
                <img src="logoItSelf.png" className="w-20 h-20 mb-4"></img>
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Bookify.
                </h1>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-10 border border-card-border">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-foreground mb-2">
                  Login Account
                </h2>
                <p className="text-muted-foreground">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-foreground/70 mb-2"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      minLength: {
                        value: 3,
                        message: "Email must be at least 3 characters",
                      },
                    })}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 rounded-xl border-2 border-card-border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-background text-foreground"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-foreground/70 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="6+ characters"
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-card-border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-background text-foreground"
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
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <p className="text-sm text-muted-foreground text-center">
                  By signing up you agree to{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
                  >
                    terms and conditions
                  </a>{" "}
                  at zoho.
                </p>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/30 text-lg"
                >
                  Login
                </button>

                {/* Create Account Link */}
                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/signUp")}
                    className="text-foreground hover:text-blue-600 font-semibold transition-colors duration-200 text-lg"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
