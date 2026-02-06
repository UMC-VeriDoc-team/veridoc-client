import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import ModalBackground from "@/components/Modal/components/ModalBackground";

import AuthLoginFailedModal from "@/components/Modal/components/auth/AuthLoginFailedModal";
import AuthMailSentModal from "@/components/Modal/components/auth/AuthMailSentModal";
import AuthPasswordChangedModal from "@/components/Modal/components/auth/AuthPasswordChangedModal";
import AuthLogoutModal from "./components/auth/AuthLogoutModal";
import AuthSignUpSuccess from "./components/auth/AuthSignUpSuccess";
import AuthLoginRequiredModal from "./components/auth/AuthRequiredModal";

import MySymptomChangedModal from "@/components/Modal/components/my/MySymptomChangedModal";
import MySymptomNotSelectedModal from "@/components/Modal/components/my/MySymptomNotSelectedModal";
import MyProfileUpdatedModal from "@/components/Modal/components/my/MyProfileUpdatedModal";
import MyWithdrawNoticeModal from "@/components/Modal/components/my/MyWithdrawNoticeModal";
import MyWithdrawDoneModal from "@/components/Modal/components/my/MyWithdrawDoneModal";

import HomeTermsAgreementModal from "@/components/Modal/components/home/HomeTermsAgreementModal";
import HomeTermsDetailModal from "@/components/Modal/components/home/HomeTermsDetailModal";
import HomeDoctorOpinionModal from "@/components/Modal/components/home/HomeDoctorOpinionModal";
import HomeTemporaryMeasureModal from "./components/home/HomeTemporaryMeasureModal";
import GuideDetailModal from "./components/guide/GuideDetailModal";

import StepDoctorOpinionRequiredModal from "./components/symptom/StepDoctorOpinionRequiredModal";
import StepTreatmentInfoRequiredModal from "./components/symptom/StepTreatmentInfoRequiredModal";

import useIsMobile from "@/hooks/useIsMobile";
import useGuideDetailModalStore from "@/stores/modal/useGuideDetailModal";
import useTemporaryMeasureModalStore from "@/stores/modal/useTemporaryMeasureModalStore";
import useDoctorOpinionModalStore from "@/stores/modal/useDoctorOpinionModalStore";
import ServicePreparingModal from "./components/common/ServicePreparingModal";
import AuthLogoutModal from "./components/auth/AuthLogoutModal";

// 약관 관련 모달: 배경 클릭 시 모달 닫힘 비활성화
const MODAL_OVERLAY_CLOSABLE: Partial<Record<ModalType, boolean>> = {
  [ModalType.HOME_TERMS_AGREEMENT]: false,
  [ModalType.HOME_TERMS_DETAIL]: false,
};

const ModalPage = () => {
  const { isModalOpen, modalType, closeModal } = useBaseModal();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // 범용가이드 상세 스토어
  const { guideType } = useGuideDetailModalStore();
  // 임시대처 방안 스토어
  const { measureId } = useTemporaryMeasureModalStore();
  // 전문의소견 스토어
  const { doctorOpinionId } = useDoctorOpinionModalStore();

  // 모바일: 범용가이드 모달에서 페이지로 전환
  useEffect(() => {
    if (!isModalOpen || modalType !== ModalType.HOME_GUIDE_DETAIL) return;
    if (!isMobile) return;

    closeModal();
    navigate("/guide/detail", { state: { guideType } });
  }, [isModalOpen, modalType, isMobile, closeModal, navigate, guideType]);

  // 모바일: 임시대처방안 모달에서 페이지로 전환
  useEffect(() => {
    if (!isModalOpen || modalType !== ModalType.HOME_TEMPORARY_MEASURE) return;
    if (!isMobile) return;

    if (!measureId) {
      closeModal();
      return;
    }

    closeModal();
    navigate(`/symptom/measure/${measureId}`);
  }, [isModalOpen, modalType, isMobile, closeModal, navigate, measureId]);

  // 모바일: 전문의소견 모달에서 페이지로 전환
  useEffect(() => {
    if (!isModalOpen || modalType !== ModalType.HOME_DOCTOR_OPINION) return;
    if (!isMobile) return;

    if (!doctorOpinionId) {
      closeModal();
      return;
    }

    closeModal();
    navigate(`/symptom/doctor/${doctorOpinionId}`);
  }, [isModalOpen, modalType, isMobile, closeModal, navigate, doctorOpinionId]);

  // 모달 열리면 body scroll lock
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
      case ModalType.AUTH_LOGIN_FAILED:
        return <AuthLoginFailedModal />;
      case ModalType.AUTH_MAIL_SENT:
        return <AuthMailSentModal />;
      case ModalType.AUTH_PASSWORD_CHANGED:
        return <AuthPasswordChangedModal />;
      case ModalType.AUTH_SIGNUP_SUCCESS:
        return <AuthSignUpSuccess />;
      case ModalType.AUTH_REQUIRED:
        return <AuthLoginRequiredModal />;
      case ModalType.AUTH_LOGOUT:
        return <AuthLogoutModal />;
      case ModalType.AUTH_LOGOUT: // 로그아웃 모달
        return <AuthLogoutModal />;

      // 홈
      case ModalType.HOME_TERMS_AGREEMENT:
        return <HomeTermsAgreementModal />;
      case ModalType.HOME_TERMS_DETAIL:
        return <HomeTermsDetailModal />;

      // 모바일: 페이지, 데스크탑: 모달 렌더
      case ModalType.HOME_DOCTOR_OPINION:
        return isMobile ? null : <HomeDoctorOpinionModal />;
      case ModalType.HOME_TEMPORARY_MEASURE:
        return isMobile ? null : <HomeTemporaryMeasureModal />;
      case ModalType.HOME_GUIDE_DETAIL:
        return isMobile ? null : <GuideDetailModal />;

      // 증상
      case ModalType.STEP_DOCTOR_OPINION_REQUIRED:
        return <StepDoctorOpinionRequiredModal />;
      case ModalType.STEP_TREATMENT_INFO_REQUIRED:
        return <StepTreatmentInfoRequiredModal />;

      // 마이페이지
      case ModalType.MY_SYMPTOM_CHANGED:
        return <MySymptomChangedModal />;
      case ModalType.MY_SYMPTOM_NOT_SELECTED:
        return <MySymptomNotSelectedModal />;
      case ModalType.MY_PROFILE_UPDATED:
        return <MyProfileUpdatedModal />;
      case ModalType.MY_WITHDRAW_NOTICE:
        return <MyWithdrawNoticeModal />;
      case ModalType.MY_WITHDRAW_DONE:
        return <MyWithdrawDoneModal />;

      // 서비스 준비 중 안내
      case ModalType.SERVICE_PREPARING:
        return <ServicePreparingModal />;
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
