import { useAuthStore } from "@/stores/user/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const RequirePainArea = ({ children }: { children?: React.ReactNode }) => {
  const { painAreaID } = useAuthStore();

  if (painAreaID == 8) {
    return <Navigate to="/usage" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RequirePainArea;
