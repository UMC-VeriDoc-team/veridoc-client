import { useEffect } from "react";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import ModalBackground from "@/components/Modal/components/ModalBackground";
import AuthLoginFailedModal from "@/components/Modal/components/auth/AuthLoginFailedModal";
import AuthMailSentModal from "@/components/Modal/components/auth/AuthMailSentModal";
import AuthPasswordChangedModal from "@/components/Modal/components/auth/AuthPasswordChangedModal";
import MySymptomChangedModal from "@/components/Modal/components/my/MySymptomChangedModal";
import MySymptomNotSelectedModal from "@/components/Modal/components/my/MySymptomNotSelectedModal";
import MyProfileUpdatedModal from "@/components/Modal/components/my/MyProfileUpdatedModal";
import MyWithdrawNoticeModal from "@/components/Modal/components/my/MyWithdrawNoticeModal";
import MyWithdrawDoneModal from "@/components/Modal/components/my/MyWithdrawDoneModal";
import HomeTermsAgreementModal from "@/components/Modal/components/home/HomeTermsAgreementModal";
import HomeTermsDetailModal from "@/components/Modal/components/home/HomeTermsDetailModal";
import HomeDoctorOpinionModal from "@/components/Modal/components/home/HomeDoctorOpinionModal";

// 약관 관련 모달: 배경 클릭 시 모달 닫힘 비활성화
const MODAL_OVERLAY_CLOSABLE: Partial<Record<ModalType, boolean>> = {
  [ModalType.HOME_TERMS_AGREEMENT]: false,
  [ModalType.HOME_TERMS_DETAIL]: false,
};

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
      case ModalType.HOME_TERMS_AGREEMENT: // 서비스 약관 동의
        return <HomeTermsAgreementModal />;
      case ModalType.HOME_TERMS_DETAIL: // 약관 상세
        return <HomeTermsDetailModal />;
      case ModalType.HOME_DOCTOR_OPINION: // 전문의 소견 전체 보기
        return <HomeDoctorOpinionModal />;

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

  return (
    <ModalBackground overlayClosable={MODAL_OVERLAY_CLOSABLE[modalType] ?? true}>
      {renderModal()}
    </ModalBackground>
  );
};

export default ModalPage;
