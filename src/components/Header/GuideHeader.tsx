import useBaseModal from "@/stores/modal/useBaseModal";
import { useNavigate } from "react-router-dom";
import { ModalType } from "../Modal/types/modal";

const GuideHeader = () => {
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  return (
    <div className="relative">
      {/* 이미지 */}
      <img
        src="/images/home/guides/banner/banner.svg"
        alt="범용 가이드 헤더"
        className="h-[360px] w-full object-cover sm:h-[420px] md:h-[520px] lg:h-[578px]"
        onClick={() => navigate("/")}
      />

      {/* 블랙 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 모바일 */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between px-6 pt-6 md:hidden">
        <img
          src="/images/responsive-logo.svg"
          alt="VeriDoc"
          className="mt-6 h-[40px] w-auto"
          draggable={false}
        />
        <button type="button" aria-label="Logout" className="shrink-0">
          <img
            src="/images/logout-button.svg"
            alt="Logout"
            className="mt-6 h-[32px] w-auto"
            draggable={false}
            onClick={() => openModal(ModalType.AUTH_LOGOUT)}
          />
        </button>
      </div>

      {/* 텍스트 영역 */}
      <div className="absolute left-6 top-[52%] z-10 flex -translate-y-1/2 flex-col gap-y-6 sm:left-10 sm:top-[48%] md:left-16 md:top-[45%] lg:left-32 lg:top-[40%] lg:-translate-y-0 lg:gap-y-8">
        <div className="flex flex-col space-y-2">
          <p className="text-[22px] font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
            내 몸이 보내는 신호,
          </p>

          <p className="text-[22px] font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
            베리닥과 함께라면 어렵지 않습니다
          </p>
        </div>

        <p className="max-w-[320px] text-[12px] font-semibold leading-relaxed text-white sm:max-w-[520px] sm:text-base md:text-lg">
          신뢰할 수 있는 의료진의 답변을 기반으로 <br className="sm:hidden" />
          증상과 원인을 쉽게 설명해요
        </p>
      </div>
    </div>
  );
};

export default GuideHeader;
