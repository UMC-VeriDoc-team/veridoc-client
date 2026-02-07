import { useMemo, useState } from "react";
import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import {
  TermsKey,
  type CheckableTermsKey,
  type PostTermRequest,
  type TermsItem,
} from "@/components/Modal/types/terms";
import useTermsAgreementStore from "@/stores/modal/useTermsAgreementStore";
import { TERMS_ITEMS } from "@/constants/terms/termsItems";
import {
  getLocationPermissionState,
  makeGeoErrorMessage,
  requestLocationOnce,
} from "@/utils/locationPermission";
import { usePostTerm } from "@/hooks/term/usePostTerm";

// 서비스 약관 동의 모달 (체크 상태는 Zustand, 전송은 usePostTerm. API response는 사용하지 않음)
const HomeTermsAgreementModal = () => {
  const { openModal, closeModal } = useBaseModal();
  const { mutate: postTerm } = usePostTerm();
  const { checked, toggleChecked, setChecked, setAll, reset, locationError, setLocationError } =
    useTermsAgreementStore();

  const termsItems = TERMS_ITEMS;

  // 전체 동의 여부 (ALL 제외)
  const checkableItems = termsItems.filter(
    (t): t is TermsItem & { key: CheckableTermsKey } => t.key !== TermsKey.ALL
  );

  const allChecked = checkableItems.every((t) => checked[t.key]);

  const locationKey: CheckableTermsKey = TermsKey.LOCATION;

  const locationItem = useMemo(
    () => termsItems.find((t) => t.key === TermsKey.LOCATION),
    [termsItems]
  );
  const locationRequired = Boolean(locationItem?.required);

  // 위치 권한 요청 중
  const [requesting, setRequesting] = useState(false);

  const canJoin = useMemo(() => {
    if (!allChecked) return false;
    if (locationRequired && !checked[locationKey]) return false;
    if (locationRequired && locationError) return false;
    return true;
  }, [allChecked, locationRequired, checked, locationKey, locationError]);

  const openDetail = (key: TermsKey) => {
    openModal(ModalType.HOME_TERMS_DETAIL, { activeKey: key });
  };

  // 위치 약관을 체크하려는 순간 실행되는 공통 함수
  const ensureLocationAllowedAndCheck = async (): Promise<boolean> => {
    setRequesting(true);
    try {
      const pState = await getLocationPermissionState();

      // 차단 상태면 요청 자체를 하지 않고 에러만 노출
      if (pState === "denied") {
        const msg = makeGeoErrorMessage("blocked");
        setLocationError(msg);
        setChecked(locationKey, false);
        return false;
      }

      // prompt/unknown/granted면 실제 요청을 한 번 시도
      const res = await requestLocationOnce();
      if (res.ok) {
        setLocationError(null);
        setChecked(locationKey, true);
        return true;
      }

      // 거부/불가/타임아웃 등
      const msg = makeGeoErrorMessage(res.reason);
      setLocationError(msg);
      setChecked(locationKey, false);
      return false;
    } finally {
      setRequesting(false);
    }
  };

  // 전체 동의 토글
  const handleToggleAll = async () => {
    const next = !allChecked;

    // 전체 해제
    if (!next) {
      setAll(false);
      // 위치 체크 해제 시 에러도 제거
      setLocationError(null);
      return;
    }

    // 전체 동의 ON 시
    if (locationRequired) {
      const ok = await ensureLocationAllowedAndCheck();
      if (!ok) {
        // 전체 동의는 성립하지 않게 유지
        setAll(false);
        return;
      }
    }

    // 위치 문제 없으면 전체 체크
    setAll(true);
  };

  // 개별 약관 체크
  const handleToggleTerm = async (key: CheckableTermsKey) => {
    // 위치 약관일 때: 체크하려는 순간 권한 확인/요청
    if (key === locationKey) {
      const next = !checked[key];

      // 체크 해제면 그냥 해제 + 에러 제거
      if (!next) {
        setChecked(key, false);
        setLocationError(null);
        return;
      }

      // 체크 ON 시도
      await ensureLocationAllowedAndCheck();
      return;
    }

    // 나머지 약관은 기존 토글
    toggleChecked(key);
  };

  // 동의하고 가입하기 (usePostTerm으로 전송만 수행, 응답값은 사용하지 않음)
  const handleSubmit = () => {
    const requestData: PostTermRequest = {
      termsOfService: checked[TermsKey.SERVICE],
      privacyPolicy: checked[TermsKey.PRIVACY],
      locationService: checked[TermsKey.LOCATION],
    };

    postTerm(requestData, {
      onSuccess: () => {
        alert("약관 동의가 완료되었습니다!");
        reset();
        closeModal();
      },
      onError: (error) => {
        console.error(error);
        alert("API 연동 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col gap-6 rounded-xl bg-white px-6 py-8 sm:min-w-[380px] sm:px-7 sm:py-10">
      {/* 상단 아이콘 */}
      <div className="flex justify-center">
        <div className="rounded-lg bg-[#2B7FFF1F] p-2">
          <Icon name="success" className="h-6 w-6" />
        </div>
      </div>

      {/* 타이틀 */}
      <div className="text-center">
        <div className="flex justify-center">
          <p className="text-lg font-bold text-brand-primary sm:text-xl">홍길동</p>
          <p className="text-lg font-bold text-gray-950 sm:text-xl">님 환영합니다!</p>
        </div>
        <p className="mt-1 text-lg font-bold text-gray-950 sm:text-xl">
          서비스 이용을 위해 약관에 동의해 주세요
        </p>
      </div>

      {/* 약관 체크 영역 */}
      <div className="mt-4 flex flex-col gap-4">
        {/* 전체 동의 */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={() => void handleToggleAll()}
              className="h-6 w-6 accent-brand-primary"
              disabled={requesting}
            />
            <span className="text-base font-semibold text-gray-900 sm:text-lg">약관 전체 동의</span>
          </label>

          <button
            type="button"
            onClick={() => openDetail(TermsKey.ALL)}
            aria-label="전체 약관 내용 보기"
            className="rounded-md p-1"
          >
            <Icon name="chevron-right" className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* 개별 약관 */}
        <div className="flex flex-col gap-3">
          {checkableItems.map((t) => (
            <div key={t.key} className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked[t.key]}
                  onChange={() => void handleToggleTerm(t.key)}
                  className="h-6 w-6 accent-brand-primary"
                  disabled={requesting && t.key === locationKey}
                />
                <span className="text-base font-medium text-gray-900 sm:text-lg">
                  {t.required && <span className="text-brand-primary">[필수] </span>}
                  {t.label}
                </span>
              </label>

              <button
                type="button"
                onClick={() => openDetail(t.key)}
                aria-label={`${t.label} 상세 보기`}
                className="rounded-md p-1"
              >
                <Icon name="chevron-right" className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        {/* 위치 에러 문구 (차단/거부/불가일 때만) */}
        {locationError && (
          <div className="rounded-md bg-gray-50 p-3 text-xs text-red-600">{locationError}</div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-6">
        <button
          type="button"
          disabled={!canJoin || requesting}
          onClick={handleSubmit}
          className={[
            "inline-flex h-12 w-full items-center justify-center rounded-[4px] text-lg font-semibold",
            canJoin ? "bg-brand-primary text-white hover:opacity-90" : "bg-gray-50 text-gray-600",
          ].join(" ")}
        >
          {requesting ? "위치 권한 확인 중..." : "동의하고 가입하기"}
        </button>
      </div>
    </div>
  );
};

export default HomeTermsAgreementModal;
