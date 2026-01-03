import { useEffect } from "react";
import { ModalType } from "@/components/modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import ModalBackground from "@/components/modal/components/ModalBackground";
import AuthLoginFailedModal from "@/components/modal/components/auth/AuthLoginFailedModal";
import AuthMailSentModal from "@/components/modal/components/auth/AuthMailSentModal";
import AuthPasswordChangedModal from "@/components/modal/components/auth/AuthPasswordChangedModal";
import MySymptomChangedModal from "@/components/modal/components/my/MySymptomChangedModal";
import MySymptomNotSelectedModal from "@/components/modal/components/my/MySymptomNotSelectedModal";
import MyProfileUpdatedModal from "@/components/modal/components/my/MyProfileUpdatedModal";
import MyWithdrawNoticeModal from "@/components/modal/components/my/MyWithdrawNoticeModal";
import MyWithdrawDoneModal from "@/components/modal/components/my/MyWithdrawDoneModal";

const ModalPage = () => {
  const { isModalOpen, modalType } = useBaseModal();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflow;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isModalOpen]);

  if (!isModalOpen || modalType === null) return null;

  const renderModal = () => {
    switch (modalType) {
      // 로그인 / 회원가입
      case ModalType.AUTH_LOGIN_FAILED: // 로그인 실패
        return <AuthLoginFailedModal />;
      case ModalType.AUTH_MAIL_SENT: // 이메일 전송 완료
        return <AuthMailSentModal />;
      case ModalType.AUTH_PASSWORD_CHANGED: // 비밀번호 변경 완료
        return <AuthPasswordChangedModal />;

      // 홈

      // 마이페이지
      case ModalType.MY_SYMPTOM_CHANGED: // 선택 증상 변경 완료
        return <MySymptomChangedModal />;
      case ModalType.MY_SYMPTOM_NOT_SELECTED: // 증상 미선택 안내
        return <MySymptomNotSelectedModal />;
      case ModalType.MY_PROFILE_UPDATED: // 개인정보 수정 완료
        return <MyProfileUpdatedModal />;
      case ModalType.MY_WITHDRAW_NOTICE: // 회원탈퇴 안내
        return <MyWithdrawNoticeModal />;
      case ModalType.MY_WITHDRAW_DONE: // 회원탈퇴 완료
        return <MyWithdrawDoneModal />;
      default:
        return null;
    }
  };

  return <ModalBackground>{renderModal()}</ModalBackground>;
};

export default ModalPage;
