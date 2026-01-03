import Icon from "@/components/icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";

// 증상 미선택 안내 모달
const MySymptomNotSelectedModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-5 py-7 sm:min-w-[380px] sm:gap-8 sm:px-7 sm:py-8">
      <div className="rounded-lg bg-[#2B7FFF1F] p-2">
        <Icon name="warning" className="h-5 w-5" />
      </div>

      <div className="flex w-full flex-col gap-8 sm:gap-12">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
            증상을 선택하지 않은 상태로 저장됩니다
          </p>
          <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
            나중에 다시 증상을 선택해 정보를
          </p>
          <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">확인할 수 있어요</p>
        </div>

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

export default MySymptomNotSelectedModal;
