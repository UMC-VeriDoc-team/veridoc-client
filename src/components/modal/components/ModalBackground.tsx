import useBaseModal from "@/stores/modal/useBaseModal";
import { useEffect } from "react";

interface ModalBackgroundProps {
  children: React.ReactNode;
}

const ModalBackground = ({ children }: ModalBackgroundProps) => {
  const { closeModal } = useBaseModal();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"; // 스크롤 잠금

    return () => {
      document.documentElement.style.overflow = "auto"; // 스크롤 복원
    };
  }, []);

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0000004A]"
    >
      <div onClick={(e) => e.stopPropagation()} className="z-[70]">
        {children}
      </div>
    </div>
  );
};

export default ModalBackground;
