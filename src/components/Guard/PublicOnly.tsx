import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/login/useAuthStore";

const PublicOnly = ({ children }: { children?: React.ReactNode }) => {
  const { isLoggedIn, painAreaID } = useAuthStore();
  const redirectTo = painAreaID == null ? "/guide" : "/home";

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicOnly;
