import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header className="sticky top-0 z-50" />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default OnboardingLayout;
