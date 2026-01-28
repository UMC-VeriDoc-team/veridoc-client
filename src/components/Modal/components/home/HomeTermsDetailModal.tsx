import Icon from "@/components/Icon/Icon";
import { ModalType } from "@/components/Modal/types/modal";
import { TermsKey } from "@/components/Modal/types/terms";
import useBaseModal from "@/stores/modal/useBaseModal";
import useTermsAgreementStore from "@/stores/modal/useTermsAgreementStore";
import { TERMS_ITEMS } from "../../constants/terms/termsItems";

// 약관 상세 모달
const HomeTermsDetailModal = () => {
  const { modalPayload, openModal } = useBaseModal();
  const { setChecked, setAll } = useTermsAgreementStore();

  const termsItems = TERMS_ITEMS;

  const activeKey = modalPayload?.activeKey ?? TermsKey.SERVICE;
  const activeItem = termsItems.find((t) => t.key === activeKey) ?? termsItems[0];

  // 뒤로가기: 리스트 모달로 전환
  const handleBack = () => {
    openModal(ModalType.HOME_TERMS_AGREEMENT);
  };

  // 동의하기: 체크 후 리스트 모달로 전환
  const handleAgree = () => {
    if (activeKey === TermsKey.ALL) {
      setAll(true);
      openModal(ModalType.HOME_TERMS_AGREEMENT);
      return;
    }

    setChecked(activeKey, true);
    openModal(ModalType.HOME_TERMS_AGREEMENT);
  };

  return (
    <div className="flex max-h-[600px] min-h-[458px] w-[92vw] max-w-[420px] flex-col justify-between gap-y-7 overflow-hidden rounded-xl bg-white px-6 py-10 sm:min-w-[380px] sm:px-7">
      {/* 상단 바 뒤로가기 */}
      <div className="flex flex-col gap-1">
        <div className="flex w-full items-center justify-start">
          <button type="button" onClick={handleBack} aria-label="이전" className="rounded-md p-2">
            <Icon name="chevron-left" className="h-4 w-4 text-[#4E5876]" />
          </button>
        </div>

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
          <>
            <pre className="text-xs font-normal text-gray-600">{item.title}</pre>
            {item.sections.map((section) => (
              <>
                <p className="ml-1 text-xs font-normal text-gray-600">{section.title}</p>
                {section.body.map((item) => {
                  if (item.type === "text") {
                    return (
                      <>
                        {item.value.map((str, idx) => (
                          <li key={idx} className="ml-5 list-disc text-xs text-gray-600">
                            {str}
                          </li>
                        ))}
                      </>
                    );
                  }

                  if (item.type === "table") {
                    return (
                      <div className="my-2 overflow-hidden rounded-[10px] border border-gray-100">
                        <table className="w-full text-xs">
                          <thead>
                            <tr>
                              {item.headers.map((h) => (
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
                            {item.rows.map((row, rIdx) => (
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
              </>
            ))}
          </>
        ))}
      </div>

      {/* 동의하기 버튼 */}
      <button
        type="button"
        onClick={handleAgree}
        className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-lg font-semibold text-white hover:opacity-90"
      >
        동의하기
      </button>
    </div>
  );
};

export default HomeTermsDetailModal;
