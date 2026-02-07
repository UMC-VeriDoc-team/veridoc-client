import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const HeaderOnlyLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      {/* 로그인/회원가입 전용: Header만 */}
      <Header className="sticky top-0 z-50" />

      {/* Header 제외 영역 */}
      <main id="app-scroll-container" className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
