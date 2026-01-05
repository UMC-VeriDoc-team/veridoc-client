import React, { useState } from "react";

// 1. 아이콘 파일 불러오기 (파일명이 다르면 꼭 수정하세요!)
// 만약 파일명에 빨간 줄이 뜨면 경로 오타를 확인하세요.
import iconKnee from "../../assets/icons/icon-knee.svg";
import iconWaist from "../../assets/icons/icon-waist.svg";
import iconShoulder from "../../assets/icons/icon-shoulder.svg";
import iconHead from "../../assets/icons/icon-head.svg";
import iconStomach from "../../assets/icons/icon-stomach.svg";
import iconNeck from "../../assets/icons/icon-neck.svg";

// 2. 데이터에 아이콘 변수 연결
const SYMPTOMS = [
  { id: 1, name: "무릎", color: "bg-blue-100", icon: iconKnee },
  { id: 2, name: "허리", color: "bg-yellow-100", icon: iconWaist },
  { id: 3, name: "어깨", color: "bg-blue-200", icon: iconShoulder },
  { id: 4, name: "두통", color: "bg-red-100", icon: iconHead },
  { id: 5, name: "복통", color: "bg-blue-50", icon: iconStomach },
  { id: 6, name: "목", color: "bg-orange-100", icon: iconNeck },
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<"symptom" | "info">("symptom");
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      {/* 상단 탭 */}
      <div className="mt-10 flex w-full max-w-4xl overflow-hidden rounded-lg border border-gray-200">
        <button
          className={`flex-1 py-4 text-center font-bold ${activeTab === "symptom" ? "bg-white text-black" : "bg-gray-100 text-gray-400"}`}
          onClick={() => setActiveTab("symptom")}
        >
          나의 증상 관리
        </button>
        <button
          className={`flex-1 py-4 text-center font-bold ${activeTab === "info" ? "bg-white text-black" : "bg-gray-100 text-gray-400"}`}
          onClick={() => setActiveTab("info")}
        >
          정보 수정
        </button>
      </div>

      {/* 메인 타이틀 */}
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

      {/* 증상 카드 그리드 */}
      <div className="mt-12 grid grid-cols-3 gap-6">
        {SYMPTOMS.map((item) => (
          <div
            key={item.id}
            // 1. overflow-hidden 추가: 이미지가 둥근 모서리 밖으로 튀어 나가는 것 방지
            className="flex h-[180px] w-[180px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* 2. 이미지 영역: 높이의 75%를 차지하도록 설정 */}
            {/* 기존의 패딩(p-4)이나 배경색 로직을 제거하고 w-full h-full로 꽉 채움 */}
            <div className="h-[75%] w-full bg-gray-50">
              <img src={item.icon} alt={item.name} className="h-full w-full object-cover" />
            </div>

            {/* 3. 텍스트 영역: 나머지 높이(25%)를 차지 */}
            <div className="flex h-[25%] w-full items-center justify-center border-t border-gray-50 bg-white">
              <span className="text-lg font-bold text-gray-700">{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className="mb-20 mt-16">
        <button
          onClick={handleButtonClick}
          className="w-[400px] rounded-lg bg-blue-500 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600"
        >
          {isEditing ? "저장하기" : "수정하기"}
        </button>
      </div>
    </div>
  );
};

export default MyPage;
