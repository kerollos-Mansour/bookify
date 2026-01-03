import { useAuth } from "../../context/authContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function GuestRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (isAuthenticated) {
        // Redirect to the page they came from, or home if they directly accessed login
        const from = (location.state as any)?.from?.pathname || "/";
        return <Navigate to={from} replace />;
    }

    return <Outlet />;
}
