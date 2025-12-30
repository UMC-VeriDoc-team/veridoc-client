import { BrowserRouter, Route, Routes } from "react-router-dom";
import ColorGuide from "./pages/guide/ColorGuide";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* tailwind custom color 시각화 */}
        <Route path="/color-guide" element={<ColorGuide />} />

        {/* 404 처리 */}
        <Route path="*" element={<div className="p-8">Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
