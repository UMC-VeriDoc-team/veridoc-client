import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSignupSymptomStore from "@/stores/signup/useSignupSymptomStore";

const ALLOWED_PATHS = ["/select-symptom", "/signup"];

// 증상 선택 리셋용 Guard 컴포넌트
const SignupSymptomResetGuard = () => {
  const location = useLocation();
  const resetSelectedSymptom = useSignupSymptomStore((s) => s.resetSelectedSymptom);

  useEffect(() => {
    const isAllowed = ALLOWED_PATHS.some((path) => location.pathname.startsWith(path));

    if (!isAllowed) {
      resetSelectedSymptom();
    }
  }, [location.pathname, resetSelectedSymptom]);

  return null;
};

export default SignupSymptomResetGuard;
