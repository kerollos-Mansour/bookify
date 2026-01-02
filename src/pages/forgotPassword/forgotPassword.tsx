import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/pageTransition/pageTransition";
import { useForgotPasswordMutation } from "../../store/api/auth.api";
import { useToast } from "../../components/UI/ToastProvider/ToastProvider";
import { ArrowLeft } from "lucide-react";

type Inputs = {
  email: string;
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("Password reset link sent to your email!");
    } catch (err: any) {
      toast.error(
        err.data?.message || "Something went wrong sending the reset link"
      );
    }
  };

  if (isSuccess) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-10 border border-card-border text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Check your email
            </h2>
            <p className="text-muted-foreground mb-8">
              We have sent a password reset link to your email address. Please
              follow the instructions to reset your password.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
            >
              Back to Login
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-10 border border-card-border">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Login
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Forgot Password?
              </h2>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground/70 mb-2"
                >
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-card-border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-background text-foreground"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending Link..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
