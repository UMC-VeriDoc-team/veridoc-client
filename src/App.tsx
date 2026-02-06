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
import MobileSplashPage from "@/pages/splash/MobileSplashPage";
import useIsMobile from "@/hooks/useIsMobile";
import MyPage from "@/pages/mypage/Mypage";
import MainPage from "@/pages/home/MainPage";
import OnboardingLayout from "./layouts/OnboardingLayout";
import HospitalMapSection from "./pages/home/components/map/HospitalMapSection";
import HomePreview from "./pages/home/components/HomePreview";
import GuideDetailPage from "./components/Modal/components/guide/GuideDetailPage";
import HomeTemporaryMeasurePage from "./components/Modal/components/home/HomeTemporaryMeasurePage";
import HomeDoctorOpinionPage from "./components/Modal/components/home/HomeDoctorOpinionPage";

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
          {/* 온보딩용 레이아웃 */}
          <Route path="/" element={<OnboardingLayout />}>
            <Route index element={<OnboardingPage />} />
          </Route>

          {/* 헤더만 있는 레이아웃 (로그인/회원가입) */}
          <Route element={<HeaderOnlyLayout />}>
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
            <Route path="/hospital" element={<HospitalMapSection />} />

            {/* 증상 */}
            <Route path="/symptom">
              <Route index element={<SymptomPage />} />
              {/* 모바일: 모달 상세 */}
              <Route path="measure/:id" element={<HomeTemporaryMeasurePage />} />
              <Route path="doctor/:id" element={<HomeDoctorOpinionPage />} />
            </Route>

            {/* 마이페이지 */}
            <Route path="/my" element={<MyPage />} />
            <Route path="/my/password" element={<MyPasswordPage />} />

            {/* 홈 화면 */}
            <Route path="/home" element={<MainPage />} />

            {/* 로그인O, 증상 부위 선택X: 범용가이드 */}
            <Route path="/guide">
              <Route index element={<HomeSymptomOnboarding />} />
              <Route path="detail" element={<GuideDetailPage />} />
            </Route>

            {/* 로그인X: 프리뷰 */}
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
