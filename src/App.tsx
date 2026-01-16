import { BrowserRouter, Route, Routes } from "react-router-dom";
import ColorGuide from "@/pages/guide/ColorGuide";
import LoginPage from "@/pages/login/LoginPage";
import PasswordEmailPage from "@/pages/password/PasswordEmailPage";
import PasswordResetPage from "@/pages/password/PasswordResetPage";
import HeaderOnlyLayout from "@/layouts/HeaderOnlyLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import ModalPage from "@/components/Modal/ModalPage";
import ModalGuidePage from "@/pages/guide/ModalGuidePage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignUpSymptomPage from "./pages/signup/SignUpSymptomPage";
import GuidePage from "./pages/guide/GuidePage";

const App = () => {
  return (
    <BrowserRouter>
      <ModalPage />
      <Routes>
        {/* 헤더만 있는 레이아웃 (온보딩/로그인/회원가입) */}
        <Route path="/" element={<HeaderOnlyLayout />}>
          <Route index element={<OnboardingPage />} />

          {/* 회원가입 */}
          <Route path="/select-symptom" element={<SignUpSymptomPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* 로그인 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 비밀번호 찾기 */}
          <Route path="/find-password" element={<PasswordEmailPage />} />
          <Route path="/password/reset" element={<PasswordResetPage />} />
        </Route>

        {/* 기본 레이아웃 (헤더+푸터) */}
        <Route element={<DefaultLayout />}>
          {/* <Route path="/home" element={<HomePage />} /> */}
          {/* <Route path="/symptom" element={<SymptomPage />} /> */}
          {/* <Route path="/my" element={<MyPage />} /> */}

          {/* 범용가이드 */}
          <Route path="/guides" element={<GuidePage />} />

          {/* 모달 테스트 페이지 */}
          <Route path="/modal-guide" element={<ModalGuidePage />} />
        </Route>

        {/* tailwind custom color 시각화 */}
        <Route path="/color-guide" element={<ColorGuide />} />

        {/* 404 처리 */}
        <Route path="*" element={<div className="p-8">Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
