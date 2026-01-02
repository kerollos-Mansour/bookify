import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../store/slices/authSlice";
import { storage } from "../../../utils/storage";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      // OAuth failed, redirect to login with error
      navigate("/login?error=" + error);
      return;
    }

    if (accessToken && refreshToken && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        // Store tokens
        storage.setToken(accessToken);
        storage.setRefreshToken(refreshToken);
        storage.setUser(user);

        // Update Redux state
        dispatch(
          setCredentials({
            user,
            accessToken,
          })
        );

        // Redirect to home
        navigate("/");
      } catch (error) {
        console.error("Error parsing OAuth callback:", error);
        navigate("/login?error=invalid_callback");
      }
    } else {
      // Missing parameters
      navigate("/login?error=missing_params");
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-foreground text-lg">Completing sign in...</p>
      </div>
    </div>
  );
}
