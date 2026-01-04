import useBaseModal from "@/stores/modal/useBaseModal";
import { useEffect } from "react";

interface ModalBackgroundProps {
  children: React.ReactNode;
  overlayClosable?: boolean; // 배경 클릭 시 모달 닫기 여부
}

const ModalBackground = ({ children, overlayClosable = true }: ModalBackgroundProps) => {
  const { closeModal } = useBaseModal();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"; // 스크롤 잠금

    return () => {
      document.documentElement.style.overflow = "auto"; // 스크롤 복원
    };
  }, []);

  const handleOverlayClick = () => {
    if (!overlayClosable) return;
    closeModal();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0000004A]"
    >
      <div onClick={(e) => e.stopPropagation()} className="z-[70]">
        {children}
      </div>
    </div>
  );
};

export default ModalBackground;
