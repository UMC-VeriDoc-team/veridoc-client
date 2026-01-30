import BottomTabBar from "@/components/BottomTabBar/BottomTabBar";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import useIsMobile from "@/hooks/useIsMobile";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex h-screen flex-col ${isMobile && "pb-16"}`}>
      {/* 기본 페이지: Header + Footer */}
      <Header className="sticky top-0 z-50" />

      {/* Header/Footer 사이 공간 */}
      <main className="flex-1">
        <Outlet />
        {isMobile ? <BottomTabBar /> : <Footer />}
      </main>
    </div>
  );
};

export default DefaultLayout;
