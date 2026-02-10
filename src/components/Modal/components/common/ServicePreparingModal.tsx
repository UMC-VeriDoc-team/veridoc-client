import Icon from "@/components/Icon/Icon";
import { useBaseModal } from "@/stores/modal/useBaseModal";

// 서비스 준비 중 안내 모달
const ServicePreparingModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-5 py-7 sm:min-w-[380px] sm:gap-8 sm:px-7 sm:py-8">
      <div className="rounded-lg bg-[#2B7FFF1F] p-2">
        <Icon name="warning" className="h-5 w-5" />
      </div>

      <div className="flex w-full flex-col gap-8 sm:gap-12">
        <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
          서비스 준비 중입니다
        </p>

        <button
          type="button"
          onClick={closeModal}
          className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-center text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:text-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ServicePreparingModal;
