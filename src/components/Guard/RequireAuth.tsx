import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/login/useAuthStore";

const RequireAuth = ({ children }: { children?: React.ReactNode }) => {
  const { authStatus } = useAuthStore();
  const location = useLocation();

  if (authStatus === "unauthenticated") {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RequireAuth;
