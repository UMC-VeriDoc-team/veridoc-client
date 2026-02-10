import { useMemo, useState } from "react";
import Icon from "@/components/Icon/Icon";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import { TermsKey } from "@/components/Modal/types/terms";
import { TERMS_ITEMS } from "@/constants/terms/termsItems";
import { useTermsAgreementStore } from "@/stores/modal/useTermsAgreementStore";
import {
  getLocationPermissionState,
  makeGeoErrorMessage,
  requestLocationOnce,
} from "@/utils/locationPermission";

// 약관 상세 모달
const HomeTermsDetailModal = () => {
  const { modalPayload, openModal, closeModal } = useBaseModal();
  const { setChecked, setAll, locationError, setLocationError } = useTermsAgreementStore();

  const from = (modalPayload?.from as string | undefined) ?? "agreement";
  const isFooterView = from === "footer";

  const termsItems = TERMS_ITEMS;

  const activeKey: TermsKey = (modalPayload?.activeKey as TermsKey) ?? TermsKey.ALL;
  const activeItem = termsItems.find((t) => t.key === activeKey) ?? termsItems[0];

  const locationItem = useMemo(
    () => termsItems.find((t) => t.key === TermsKey.LOCATION),
    [termsItems]
  );
  const locationRequired = Boolean(locationItem?.required);

  const [requesting, setRequesting] = useState(false);

  const isLocationDetail = activeKey === TermsKey.LOCATION;
  const isAllDetail = activeKey === TermsKey.ALL;
  const needsGeoCheck = (isLocationDetail || isAllDetail) && locationRequired;

  const handleBack = () => {
    // 약관 동의 플로우에서만 뒤로가기 동작
    openModal(ModalType.HOME_TERMS_AGREEMENT);
  };

  // 하단 버튼 동작
  const handlePrimaryAction = async () => {
    if (isFooterView) {
      closeModal();
      return;
    }

    // ALL 상세
    if (isAllDetail) {
      // 위치가 필수이면 위치 권한 확인/요청이 먼저 성공해야 전체 동의 가능
      if (needsGeoCheck) {
        setRequesting(true);
        try {
          const pState = await getLocationPermissionState();
          if (pState === "denied") {
            setLocationError(makeGeoErrorMessage("blocked"));
            setChecked(TermsKey.LOCATION, false);
            return;
          }

          const res = await requestLocationOnce();
          if (!res.ok) {
            setLocationError(makeGeoErrorMessage(res.reason));
            setChecked(TermsKey.LOCATION, false);
            return;
          }

          // 위치 OK
          setLocationError(null);
          setChecked(TermsKey.LOCATION, true);
        } finally {
          setRequesting(false);
        }
      }

      // 전체 동의 처리
      setAll(true);
      openModal(ModalType.HOME_TERMS_AGREEMENT);
      return;
    }

    // LOCATION 상세
    if (isLocationDetail) {
      setRequesting(true);
      try {
        const pState = await getLocationPermissionState();
        if (pState === "denied") {
          setLocationError(makeGeoErrorMessage("blocked"));
          setChecked(TermsKey.LOCATION, false);
          return;
        }

        const res = await requestLocationOnce();
        if (!res.ok) {
          setLocationError(makeGeoErrorMessage(res.reason));
          setChecked(TermsKey.LOCATION, false);
          return;
        }

        setLocationError(null);
        setChecked(TermsKey.LOCATION, true);
        openModal(ModalType.HOME_TERMS_AGREEMENT);
        return;
      } finally {
        setRequesting(false);
      }
    }

    // 기타 약관 상세
    setChecked(activeKey, true);
    openModal(ModalType.HOME_TERMS_AGREEMENT);
  };

  return (
    <div className="flex max-h-[600px] min-h-[458px] w-[92vw] max-w-[420px] flex-col justify-between gap-y-7 overflow-hidden rounded-xl bg-white px-6 py-10 sm:min-w-[380px] sm:px-7">
      {/* 상단 바 (푸터일 때 뒤로가기 숨김) */}
      <div className="flex flex-col gap-1">
        {!isFooterView && (
          <div className="flex w-full items-center justify-start">
            <button type="button" onClick={handleBack} aria-label="이전" className="rounded-md p-2">
              <Icon name="chevron-left" className="h-4 w-4 text-[#4E5876]" />
            </button>
          </div>
        )}

        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 sm:text-xl">
            {activeItem.label.includes("전체") ? "전체 약관 내용" : activeItem.label}
          </p>
          <p className="mt-1 text-base font-medium text-gray-500">
            안전한 서비스 이용을 위한 약관의 전문입니다.
          </p>
        </div>
      </div>

      {/* 본문 스크롤 영역 */}
      <div className="max-h-[323px] overflow-y-auto rounded-lg bg-gray-50 p-4 text-xs leading-6 text-gray-600">
        {activeItem.content.map((item) => (
          <div key={item.title}>
            <pre className="text-xs font-normal text-gray-600">{item.title}</pre>

            {item.sections.map((section) => (
              <div key={section.title}>
                <p className="ml-1 text-xs font-normal text-gray-600">{section.title}</p>

                {section.body.map((bodyItem, idx) => {
                  if (bodyItem.type === "text") {
                    return (
                      <div key={`${section.title}-text-${idx}`}>
                        {bodyItem.value.map((str, sIdx) => (
                          <li key={sIdx} className="ml-5 list-disc text-xs text-gray-600">
                            {str}
                          </li>
                        ))}
                      </div>
                    );
                  }

                  if (bodyItem.type === "table") {
                    return (
                      <div
                        key={`${section.title}-table-${idx}`}
                        className="my-2 overflow-hidden rounded-[10px] border border-gray-100"
                      >
                        <table className="w-full text-xs">
                          <thead>
                            <tr>
                              {bodyItem.headers.map((h) => (
                                <th
                                  key={h}
                                  className="border-b border-gray-100 px-3 py-1 text-center font-normal text-gray-950 first:border-r"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          <tbody>
                            {bodyItem.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-gray-100 last:border-0">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className="px-3 py-1 text-center text-gray-950 first:border-r first:border-gray-100"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 위치 에러 문구: 동의 플로우에서만 보여주기 */}
      {!isFooterView && locationError && needsGeoCheck && (
        <div className="rounded-md bg-gray-50 p-3 text-xs text-red-600">{locationError}</div>
      )}

      {/* 하단 버튼 */}
      <button
        type="button"
        onClick={() => void handlePrimaryAction()}
        disabled={!isFooterView && requesting}
        className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-lg font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {isFooterView ? "확인" : requesting ? "위치 권한 확인 중..." : "동의하기"}
      </button>
    </div>
  );
};

export default HomeTermsDetailModal;
