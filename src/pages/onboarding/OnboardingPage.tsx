import { Link } from "react-router-dom";

const OnboardingPage = () => {
  return (
    <div className="h-full w-full bg-white">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_620px]">
        {/* Left: Desktop only */}
        <div className="hidden bg-brand-primary lg:block" />

        {/* Right: Logo + 회원가입 + 로그인 */}
        <div className="flex h-full items-center justify-center px-6 py-10 lg:px-12 lg:py-12">
          <div className="flex w-full max-w-[520px] flex-col gap-10 lg:gap-16">
            <div className="flex flex-col items-center gap-2 text-center">
              {/* 임시: Logo */}
              <div className="flex items-center">
                <div className="font-brand text-5xl font-bold leading-none text-brand-primary sm:text-6xl">
                  VeriDoc
                </div>
              </div>

              <p className="max-w-[22rem] text-base font-semibold leading-6 text-brand-primary sm:text-xl sm:leading-7">
                내 몸의 언어를 전문의의 시선으로 읽다
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              {/* 회원가입 */}
              <Link
                to="/signup" // 임시 주소
                className="inline-flex h-12 w-full items-center justify-center rounded-[4px] border border-brand-primary bg-white text-base font-semibold leading-none text-brand-primary transition-colors hover:bg-brand-primary/10 sm:w-48 sm:text-lg"
              >
                회원가입
              </Link>
              {/* 로그인 */}
              <Link
                to="/login" // 임시 주소
                className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:w-48 sm:text-lg"
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
