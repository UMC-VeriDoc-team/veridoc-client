import { BrowserRouter, Route, Routes } from "react-router-dom";
import ColorGuide from "./pages/guide/ColorGuide";
import LoginPage from "./pages/login/LoginPage";
import PasswordEmailPage from "./pages/password/PasswordEmailPage";
import PasswordResetPage from "./pages/password/PasswordResetPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* tailwind custom color 시각화 */}
        <Route path="/color-guide" element={<ColorGuide />} />

        {/* 404 처리 */}
        <Route path="*" element={<div className="p-8">Not Found</div>} />

        {/* 로그인 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 비밀번호 찾기 */}
        <Route path="/password/email" element={<PasswordEmailPage />} />
        <Route path="/password/reset" element={<PasswordResetPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
