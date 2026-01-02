import { Link } from "react-router-dom";

const OnboardingPage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_620px]">
        {/* Left: Desktop only */}
        <div className="hidden bg-brand-primary lg:block" />

        {/* Right: Logo + 회원가입 + 로그인 */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <div className="flex w-full max-w-[520px] flex-col gap-16">
            <div className="flex flex-col items-center gap-2 text-center">
              {/* 임시: Logo */}
              <div className="flex items-center">
                <div className="font-brand text-6xl font-bold text-brand-primary">VeriDoc</div>
              </div>

              <p className="text-xl font-semibold text-brand-primary">
                내 몸의 언어를 전문의의 시선으로 읽다
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              {/* 회원가입 */}
              <Link
                to="/signup" // 임시 주소
                className="inline-flex h-12 w-48 items-center justify-center rounded-[4px] border border-brand-primary bg-white text-lg font-semibold leading-none text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                회원가입
              </Link>
              {/* 로그인 */}
              <Link
                to="/login" // 임시 주소
                className="inline-flex h-12 w-48 items-center justify-center rounded-[4px] bg-brand-primary text-lg font-semibold leading-none text-white transition-colors hover:opacity-90"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
