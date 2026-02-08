import { useAuthStore } from "@/stores/login/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const RequirePainArea = ({ children }: { children?: React.ReactNode }) => {
  const { painAreaID } = useAuthStore();

  if (painAreaID == 8) {
    return <Navigate to="/guide" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RequirePainArea;
