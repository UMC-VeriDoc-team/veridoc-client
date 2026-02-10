import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/user/useAuthStore";

const PublicOnly = ({ children }: { children?: React.ReactNode }) => {
  const { authStatus, painAreaID } = useAuthStore();
  const redirectTo = painAreaID == null ? "/guide" : "/home";

  if (authStatus === "authenticated") {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicOnly;
