import { BrowserRouter, Route, Routes } from "react-router-dom";
import ColorGuide from "./pages/guide/ColorGuide";
import HeaderOnlyLayout from "./layouts/HeaderOnlyLayout";
import DefaultLayout from "./layouts/DefaultLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 헤더만 있는 레이아웃 (온보딩/로그인/회원가입) */}
        <Route path="/" element={<HeaderOnlyLayout />}>
          {/* <Route index element={<OnboardingPage />} /> */}
        </Route>

        {/* 기본 레이아웃 (헤더+푸터) */}
        <Route element={<DefaultLayout />}>
          {/* <Route path="/home" element={<HomePage />} /> */}
          {/* <Route path="/symptom" element={<SymptomPage />} /> */}
          {/* <Route path="/my" element={<MyPage />} /> */}
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
