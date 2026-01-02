import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 기본 페이지: Header + Footer */}
      <Header />

      {/* Header/Footer 사이 공간 */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
