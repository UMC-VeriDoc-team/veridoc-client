import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      {/* 기본 페이지: Header + Footer */}
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
