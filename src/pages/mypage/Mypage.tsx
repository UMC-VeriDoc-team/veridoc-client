import React, { useState } from "react";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
// Icon 컴포넌트 불러오기 (경로 확인!)
import Icon from "../../components/Icon/Icon";

// [데이터] 증상 리스트
const SYMPTOMS = [
  { id: 1, name: "무릎", iconName: "icon-knee" },
  { id: 2, name: "허리", iconName: "icon-waist" },
  { id: 3, name: "어깨", iconName: "icon-shoulder" },
  { id: 4, name: "두통", iconName: "icon-head" },
  { id: 5, name: "복통", iconName: "icon-stomach" },
  { id: 6, name: "목", iconName: "icon-neck" },
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<"symptom" | "info">("symptom");
  //정보 수정탭 안에서 '프로필'을 볼지 '비밀번호'를 볼지 결정하는 상태 <-- 이제 할거임.

  const [isEditing, setIsEditing] = useState(false);

  const { openModal } = useBaseModal();

  // -----------------------------------------------------------------------
  // [화면 1] 나의 증상 관리
  // -----------------------------------------------------------------------
  const renderSymptomContent = () => (
    <>
      <div className="mt-16 text-center">
        <h2 className="mb-2 text-3xl font-bold text-blue-500">
          {isEditing ? "현재 확인 중인 증상을 변경해 보세요" : "현재 확인 중인 증상이에요"}
        </h2>
        <p className="mt-4 leading-relaxed text-gray-500">
          {isEditing ? (
            <>
              다른 증상을 확인하고 싶다면 선택을 변경할 수 있어요.
              <br />
              필요하다면 증상을 선택하지 않고 넘어갈 수도 있어요.
            </>
          ) : (
            "다른 증상을 확인하고 싶다면 선택을 변경할 수 있어요"
          )}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6">
        {SYMPTOMS.map((item) => (
          <div
            key={item.id}
            className="flex h-[180px] w-[180px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="h-[75%] w-full bg-gray-50">
              <Icon name={item.iconName} className="h-full w-full object-cover" />
            </div>
            <div className="flex h-[25%] w-full items-center justify-center border-t border-gray-50 bg-white">
              <span className="text-lg font-bold text-gray-700">{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-20 mt-16">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-[400px] rounded-lg bg-blue-500 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600"
        >
          {isEditing ? "저장하기" : "수정하기"}
        </button>
      </div>
    </>
  );

  // -----------------------------------------------------------------------
  // [화면 2] 정보 수정 컨텐츠
  // -----------------------------------------------------------------------
  const renderInfoContent = () => (
    <div className="mb-20 mt-12 flex w-full max-w-3xl flex-col">
      {/* === 상단: 프로필 + 입력 폼 영역 === */}
      <div className="flex flex-col gap-12 md:flex-row">
        {/* 1. 왼쪽: 프로필 사진 */}
        <div className="flex w-full flex-col items-center md:w-1/3">
          <h3 className="mb-6 w-full text-left text-lg font-bold text-black">개인정보 수정</h3>
          <div className="relative">
            <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-4 border-blue-500 bg-gray-50">
              {/* ✨ [수정] 추출하신 'icon-male'을 프로필 이미지로 사용 */}
              <Icon name="icon-male" className="h-full w-full object-cover" />
            </div>
            {/* 카메라 버튼 */}
            <button className="absolute bottom-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50">
              <span className="text-lg">📷</span>
            </button>
          </div>
        </div>

        {/* 2. 오른쪽: 입력 폼 */}
        <div className="mt-4 flex w-full flex-col space-y-6 md:mt-16 md:w-2/3">
          {/* 이름 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-500">이름</label>
            <input
              type="text"
              defaultValue="홍길동"
              className="w-full rounded-md border border-gray-300 p-3 text-black focus:outline-blue-500"
            />
          </div>

          {/* 생년월일 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-500">생년월일</label>
            <input
              type="text"
              defaultValue="2000 / 11 / 10"
              className="w-full rounded-md border border-gray-300 p-3 text-black focus:outline-blue-500"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-500">이메일</label>
            <div className="relative">
              <input
                type="email"
                defaultValue="honggil2000@naver.com"
                disabled
                className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-500"
              />
              <div className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center">
                {/* ✨ [수정] 자물쇠 아이콘 적용 */}
                <Icon name="icon-lock" className="h-full w-full text-gray-400" />
              </div>
            </div>
          </div>

          {/* 성별 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-500">성별</label>
            <div className="flex gap-2">
              <button className="flex-1 rounded-md border border-blue-500 bg-white py-3 font-bold text-blue-500 transition-colors">
                남성
              </button>
              <button className="flex-1 rounded-md border border-gray-200 bg-gray-50 py-3 font-bold text-gray-400 transition-colors hover:bg-gray-100">
                여성
              </button>
            </div>
          </div>

          {/* 저장 버튼 */}
          <button
            //수정완료 모달 연결
            onClick={() => openModal(ModalType.MY_PROFILE_UPDATED)}
            className="mt-4 w-full rounded-lg bg-blue-500 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600"
          >
            개인정보 저장
          </button>
        </div>
      </div>

      {/* === 하단: 보안설정 & 회원탈퇴 === */}
      <div className="mt-16 space-y-12">
        {/* 보안설정 */}
        <section>
          <h3 className="mb-1 text-lg font-bold text-black">보안설정</h3>
          <p className="mb-4 text-sm text-gray-500">
            계정 보안을 위해 주기적인 비밀번호 변경을 권장해요.
          </p>
          <button
            //비밀번호 변경 모달
            className="group flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <span className="font-bold text-black">비밀번호 변경</span>
            <div className="flex h-5 w-5 items-center justify-center transition-transform group-hover:translate-x-1">
              {/* ✨ [수정] 화살표 아이콘 적용 */}
              <Icon name="icon-arrow" className="h-full w-full text-gray-400" />
            </div>
          </button>
        </section>

        {/* 회원탈퇴 */}
        <section>
          <h3 className="mb-1 text-lg font-bold text-black">회원탈퇴</h3>
          <p className="mb-4 text-sm text-gray-500">
            회원탈퇴를 신청하기 전에 아래 사항을 꼭 확인해 주세요.
          </p>

          <div className="mb-4 rounded-lg bg-gray-50 p-6 text-sm leading-relaxed text-gray-700">
            1. 회원 탈퇴 시 회원님의 개인정보는 관련 법령에 따라 일정 기간 보관 후 삭제됩니다.
            <br />
            2. 탈퇴 후에는 아이디 및 보유 혜택이 모두 소멸되며, 복구가 불가능합니다.
          </div>

          <button
            //회원탈퇴 모달
            onClick={() => openModal(ModalType.MY_WITHDRAW_NOTICE)}
            className="group flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <span className="font-bold text-black">회원탈퇴</span>
            <div className="flex h-5 w-5 items-center justify-center transition-transform group-hover:translate-x-1">
              {/* ✨ [수정] 화살표 아이콘 적용 */}
              <Icon name="icon-arrow" className="h-full w-full text-gray-400" />
            </div>
          </button>
        </section>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      {/* 🚀 상단 로고 영역 */}
      <div className="mb-8 mt-10 flex items-center justify-center">
        {/* ✨ [수정] VeriDoc 로고 아이콘 적용 (크기는 h-10 w-auto 등으로 조절 가능) */}
        <div className="h-12">
          <Icon name="icon-logo" className="h-full w-auto" />
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg border border-gray-200">
        <button
          className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === "symptom" ? "border-b-2 border-blue-500 bg-white text-blue-500" : "bg-gray-50 text-gray-400"}`}
          onClick={() => setActiveTab("symptom")}
        >
          나의 증상 관리
        </button>
        <button
          className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === "info" ? "border-b-2 border-blue-500 bg-white text-blue-500" : "bg-gray-50 text-gray-400"}`}
          onClick={() => setActiveTab("info")}
        >
          정보 수정
        </button>
      </div>

      {activeTab === "symptom" ? renderSymptomContent() : renderInfoContent()}
    </div>
  );
};

export default MyPage;
