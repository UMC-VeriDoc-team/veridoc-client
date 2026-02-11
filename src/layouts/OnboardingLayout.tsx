import BottomTabBar from "@/components/BottomTabBar/BottomTabBar";
import Header from "@/components/Header/Header";
import useIsMobile from "@/hooks/useIsMobile";
import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header className="sticky top-0 z-50" />
      <main className="flex-1 overflow-hidden">
        <Outlet />
        {isMobile && <BottomTabBar />}
      </main>
    </div>
  );
};

export default OnboardingLayout;
