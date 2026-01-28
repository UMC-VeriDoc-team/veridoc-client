import { useState } from "react";
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
import SymptomPage from "@/pages/symptom/SymptomPage";
import MyPasswordPage from "./pages/mypage/MyPasswordPage";
import SignUpPage from "@/pages/signup/SignUpPage";
import SignUpSymptomPage from "@/pages/signup/SignUpSymptomPage";
import HomeSymptomOnboarding from "@/pages/home/components/HomeSymptomOnboarding";
import HomePreview from "@/pages/home/components/HomePreview";
import MobileSplashPage from "@/pages/splash/MobileSplashPage";
import useIsMobile from "./hooks/useIsMobile";
import MyPage from "@/pages/mypage/Mypage";

const App = () => {
  const isMobile = useIsMobile();
  const [showSplash, setShowSplash] = useState(true);

  const shouldShowSplash = isMobile && showSplash;

  return (
    <BrowserRouter>
      <ModalPage />

      {shouldShowSplash ? (
        <MobileSplashPage onFinish={() => setShowSplash(false)} />
      ) : (
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

            {/* 증상 */}
            <Route path="/symptom" element={<SymptomPage />} />

            {/* 마이페이지 */}
            <Route path="/my" element={<MyPage />} />
            <Route path="/my/password" element={<MyPasswordPage />} />

            {/* 추후 메인 홈과 합쳐질 예정 */}
            {/* 임시: 범용가이드 */}
            <Route path="/guides" element={<HomeSymptomOnboarding />} />
            {/* 임시: 프리뷰 */}
            <Route path="/preview" element={<HomePreview />} />

            {/* 모달 테스트 페이지 */}
            <Route path="/modal-guide" element={<ModalGuidePage />} />
          </Route>

          {/* tailwind custom color 시각화 */}
          <Route path="/color-guide" element={<ColorGuide />} />

          {/* 404 처리 */}
          <Route path="*" element={<div className="p-8">Not Found</div>} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
