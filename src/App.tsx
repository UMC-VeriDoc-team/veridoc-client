import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useIsMobile from "@/hooks/useIsMobile";
import { useAuthStore } from "@/stores/user/useAuthStore";

import ScrollToTop from "@/components/Scroll/ScrollToTop";
import ModalPage from "@/components/Modal/ModalPage";
import SignupSymptomResetGuard from "@/components/Guard/SignupSymptomResetGuard";

/* layouts */
import HeaderOnlyLayout from "@/layouts/HeaderOnlyLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";

/* pages */
import MobileSplashPage from "@/pages/splash/MobileSplashPage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import LoginPage from "@/pages/login/LoginPage";
import SignUpPage from "@/pages/signup/SignUpPage";
import SignUpSymptomPage from "@/pages/signup/SignUpSymptomPage";
import PasswordEmailPage from "@/pages/password/PasswordEmailPage";
import PasswordResetPage from "@/pages/password/PasswordResetPage";
import MainPage from "@/pages/home/MainPage";
import MyPage from "@/pages/mypage/Mypage";
import MyPasswordPage from "@/pages/mypage/MyPasswordPage";
import SymptomPage from "@/pages/symptom/SymptomPage";
import HomeSymptomOnboarding from "@/pages/usage/UsageGuidePage";
import HomePreview from "@/pages/preview/HomePreview";
import ModalGuidePage from "@/pages/guide/ModalGuidePage";
import ColorGuide from "@/pages/guide/ColorGuide";

/* modal pages */
import UsageGuideDetailPage from "@/components/Modal/components/usage/UsageGuideDetailPage";
import HomeTemporaryMeasurePage from "@/components/Modal/components/home/HomeTemporaryMeasurePage";
import HomeDoctorOpinionPage from "@/components/Modal/components/home/HomeDoctorOpinionPage";
import PublicOnly from "@/components/Guard/PublicOnly";
import RequireAuth from "@/components/Guard/RequireAuth";
import RequirePainArea from "@/components/Guard/RequirePainArea";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  const [showSplash, setShowSplash] = useState(true);
  const shouldShowSplash = isMobile && showSplash;
  const { initAuth, authStatus, painAreaID } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const setup = async () => {
      await initAuth();
      setIsInitializing(false);
    };
    setup();
  }, [initAuth]);

  if (isInitializing) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SignupSymptomResetGuard />
        <ScrollToTop />
        <ModalPage />

        {shouldShowSplash ? (
          <MobileSplashPage onFinish={() => setShowSplash(false)} />
        ) : (
          <Routes>
            {/* 온보딩: 로그인 안 한 상태에서만 */}
            <Route
              path="/"
              element={
                authStatus !== "authenticated" ? (
                  <OnboardingLayout />
                ) : (
                  <Navigate to={painAreaID == null ? "/usage" : "/home"} replace />
                )
              }
            >
              <Route index element={<OnboardingPage />} />
            </Route>

            {/* 로그인/회원가입 레이아웃 */}
            <Route element={<HeaderOnlyLayout />}>
              {/* 로그인 */}
              <Route path="/login" element={<LoginPage />} />

              {/* 회원가입 */}
              <Route path="/select-symptom" element={<SignUpSymptomPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* 비밀번호 찾기 */}
              <Route path="/find-password" element={<PasswordEmailPage />} />
              <Route path="/password/reset" element={<PasswordResetPage />} />
            </Route>

            {/* 프리뷰: 비로그인 전용 */}
            <Route
              path="/preview"
              element={
                <PublicOnly>
                  <DefaultLayout />
                </PublicOnly>
              }
            >
              <Route index element={<HomePreview />} />
              <Route path="detail" element={<UsageGuideDetailPage />} />
            </Route>

            {/* 로그인 후 서비스 영역 */}
            <Route
              element={
                <RequireAuth>
                  <DefaultLayout />
                </RequireAuth>
              }
            >
              {/* 홈: painAreaID 없으면 /usage */}
              <Route
                path="/home"
                element={
                  <RequirePainArea>
                    <Outlet />
                  </RequirePainArea>
                }
              >
                <Route index element={<MainPage />} />
                <Route path="measure/:id" element={<HomeTemporaryMeasurePage />} />
                <Route path="doctor/:id" element={<HomeDoctorOpinionPage />} />
              </Route>

              {/* 범용가이드 */}
              <Route path="/usage">
                <Route index element={<HomeSymptomOnboarding />} />
                <Route path="detail" element={<UsageGuideDetailPage />} />
              </Route>

              {/* 증상 */}
              <Route path="/symptom">
                <Route index element={<SymptomPage />} />
              </Route>

              {/* 마이페이지 */}
              <Route path="/my" element={<MyPage />} />
              <Route path="/my/password" element={<MyPasswordPage />} />

              {/* 모달 테스트 */}
              <Route path="/modal-guide" element={<ModalGuidePage />} />
            </Route>

            {/* 기타 */}
            <Route path="/color-guide" element={<ColorGuide />} />
            <Route path="*" element={<div className="p-8">Not Found</div>} />
          </Routes>
        )}
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
