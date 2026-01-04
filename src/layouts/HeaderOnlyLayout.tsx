import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";

const HeaderOnlyLayout = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* 온보딩/로그인/회원가입 전용: Header만 */}
      <Header />

      {/* Header 제외 영역 */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
