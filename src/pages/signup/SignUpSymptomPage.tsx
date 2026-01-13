import Icon from "@/components/Icon/Icon";
import SignUpSymptomForm from "./components/SignUpSymptomForm";
import { useLocation, useNavigate } from "react-router-dom";

type LocationState = {
  from?: string;
};

const SignUpSymptomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const handleBack = () => {
    const from = state?.from ?? "/";
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex max-w-[900px] flex-col items-center px-6 pt-[97px]">
        <button
          type="button"
          onClick={handleBack}
          className="absolute left-[48px] top-[99px] h-[105px] w-[37px] gap-[10px] p-[10px]"
          aria-label="뒤로가기"
        >
          <Icon name="arrow-back" className="h-full w-full" />
        </button>

        <div className="flex h-[80px] flex-col items-center gap-6">
          <h1 className="flex h-[50px] items-center justify-center px-[10px] text-center text-[36px] font-extrabold leading-[1.18] tracking-[-0.025em] text-brand-primary">
            주로 아픈 곳을 선택해주세요!
          </h1>

          <p className="flex h-[25px] items-center justify-center px-[10px] text-center text-[18px] font-medium leading-[1.18] tracking-[-0.025em] text-gray-950">
            선택한 부위를 기반으로 대처 가이드와 병원 정보를 추천해드립니다 <br />
            필요하다면 증상을 선택하지 않고 넘어갈 수도 있어요
          </p>
        </div>

        <div className="mt-[105px]">
          <SignUpSymptomForm />
        </div>
      </main>
    </div>
  );
};

export default SignUpSymptomPage;
