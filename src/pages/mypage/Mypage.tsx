import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import Icon from "../../components/Icon/Icon";
import logoData from "@/assets/images/logo.svg";
import SymptomGrid from "@/components/Symptom/SymptomGrid";

const MyPage = () => {
  const navigate = useNavigate();
  //상태관리
  const [activeTab, setActiveTab] = useState<"symptom" | "info">("symptom");
  const [isEditing, setIsEditing] = useState(false);
  const { openModal } = useBaseModal();

  //프로필 관련 State
  const [name, setName] = useState("홍길동");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birth, setBirth] = useState({ year: "2000", month: "11", day: "10" });
  const [errors, setErrors] = useState({ name: "", birth: "", gender: "" });
  const [selectedKey, setSelectedKey] = useState<string | null>("knee");

  // -----------------------------------------------------------------------
  // [로직 함수들]
  // -----------------------------------------------------------------------

  // 증상 선택 , 문자열 key -> 숫자 id 로 변환
  const handleSelectSymptom = (key: string) => {
    if (!isEditing) return; // 수정 모드 아니면 작동 안 함

    setSelectedKey((prev) => {
      if (prev === key) return null; // 이미 선택된 거 누르면 해제
      return key; // 새로운 거 선택
    });
  };

  // 증상 저장 로직
  const handleSaveSymptom = () => {
    // 1. 수정하기 버튼을 눌렀을 때 (View -> Edit)
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setIsEditing(false);

    // [수정] null 체크 대상 변경 (selectedSymptom -> selectedKey)
    if (selectedKey === null) {
      openModal(ModalType.MY_SYMPTOM_NOT_SELECTED);
    } else {
      openModal(ModalType.MY_SYMPTOM_CHANGED);
    }
  };

  // 이름 및 생년월일 유효성 검사 후 저장 로직
  const handleSaveProfile = () => {
    const newErrors = { name: "", birth: "", gender: "" }; // 일단 에러 없다고 가정
    let isValid = true; // 통과 여부 플래그

    // 1. 이름 검사
    if (!name.trim()) {
      newErrors.name = "이름을 입력해주세요";
      isValid = false;
    }
    // ✨ [추가] 성별 선택 여부 검사
    if (!gender) {
      newErrors.gender = "필수 선택 사항입니다"; // 에러 문구 반영
      isValid = false;
    }

    // 2. 생년월일 검사 (빈칸, 숫자여부, 범위)
    const { year, month, day } = birth;
    const y = parseInt(year);
    const m = parseInt(month);
    const d = parseInt(day);
    const currentYear = new Date().getFullYear();

    // 빈칸이 있거나 숫자가 아닌 경우
    if (!year || !month || !day || isNaN(y) || isNaN(m) || isNaN(d)) {
      newErrors.birth = "생년월일을 모두 숫자로 입력해주세요";
      isValid = false;
    }
    // 범위가 이상한 경우 (예: 100월, 3000년, 32일 등)
    else if (y < 1900 || y > currentYear || m < 1 || m > 12 || d < 1 || d > 31) {
      newErrors.birth = "생년월일 형식이 올바르지 않습니다";
      isValid = false;
    }

    // 3. 결과 반영
    setErrors(newErrors);

    // 4. 전부 통과했으면 모달 열기!
    if (isValid) {
      openModal(ModalType.MY_PROFILE_UPDATED);
    }
  };

  // -----------------------------------------------------------------------
  // [화면 1] 나의 증상 관리
  // -----------------------------------------------------------------------
  const renderSymptomContent = () => (
    <>
      <div className="mt-16 text-center">
        <h2 className="mb-2 text-3xl font-bold text-brand-primary">
          {isEditing ? "현재 확인 중인 증상을 변경해 보세요" : "현재 확인 중인 증상이에요"}
        </h2>
        {/* ✨ [수정] 작은 설명: 모드 상관없이 항상 똑같이 2줄 표시 */}
        <p className="mt-4 leading-relaxed text-gray-950">
          다른 증상을 확인하고 싶다면 선택을 변경할 수 있어요
          <br />
          필요하다면 증상을 선택하지 않고 넘어갈 수도 있어요
        </p>
      </div>

      {/* ✨ [대체] 복잡한 map 코드 삭제 -> 공용 컴포넌트 사용 */}
      <div
        className={`mt-12 flex justify-center ${!isEditing ? "pointer-events-none opacity-80" : ""}`}
      >
        {/* pointer-events-none: 수정 모드 아닐 때 클릭 방지 */}
        <SymptomGrid
          selectedKey={selectedKey}
          multiAttemptedKey={null} // 마이페이지에선 사용 안 함
          onSelect={handleSelectSymptom}
        />
      </div>

      <div className="mb-20 mt-16">
        <button
          onClick={() => handleSaveSymptom()}
          className="w-[400px] rounded bg-brand-primary py-4 text-lg font-bold text-white transition-colors hover:bg-brand-primary"
        >
          {isEditing ? "저장하기" : "수정하기"}
        </button>
      </div>
    </>
  );

  // -----------------------------------------------------------------------
  // 정보 수정 > 프로필 수정 (이름변경 : renderInfoContent -> renderProfileForm 으로 변경)
  // -----------------------------------------------------------------------
  const renderProfileForm = () => (
    //renderProfileForm 으로 이름 변경
    <div className="mb-20 mt-12 flex w-full max-w-3xl flex-col">
      {/* === 상단: 프로필 + 입력 폼 영역 === */}
      <div className="flex flex-col gap-12 md:flex-row">
        {/* 1. 왼쪽: 프로필 사진 */}
        <div className="flex w-full flex-col items-center md:w-1/3">
          <h3 className="mb-6 w-full text-left text-lg font-bold text-gray-950">개인정보 수정</h3>
          <div className="relative">
            <div className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border-4 border-brand-primary bg-gray-50">
              {/* ✨ [수정] 성별에 따른 아이콘 분기, 기본은 male */}
              <Icon
                name={gender === "female" ? "icon-female" : "icon-male"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2. 오른쪽: 입력 폼 */}
        <div className="mt-4 flex w-full flex-col space-y-6 md:mt-16 md:w-2/3">
          {/* 이름 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-600">이름</label>
            <input
              type="text"
              value={name} // ✨ [수정] state 변수 연결
              onChange={(e) => setName(e.target.value)} // ✨ [수정] 입력할 때마다 state 변경
              //에러가 있으면 (errors.name) 빨간 테두리 추가, 없으면 회색/파란색
              className={`w-full rounded border p-3 text-gray-900 focus:outline-none ${
                errors.name
                  ? "border-error focus:border-error" // 에러일 때 스타일
                  : "border-gray-200 focus:border-brand-primary" // 정상일 때 스타일
              }`}
            />
            {/* ✨ 에러 메시지가 있을 때만 빨간 글씨 보여주기 */}
            {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
          </div>

          {/* 생년월일 (3단 분리 + 유효성 검사) */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-600">생년월일</label>

            {/* 겉보기엔 하나의 박스지만, 실제론 3개의 입력칸이 들어있는 컨테이너 */}
            <div
              className={`flex w-full items-center rounded border p-3 focus-within:ring-2 ${
                errors.birth
                  ? "border-error focus-within:border-error focus-within:ring-error" // 에러: 빨강
                  : "border-gray-200 focus-within:border-brand-primary focus-within:ring-brand-primary" // 정상: 파랑
              }`}
            >
              {/* 1. 년도 (YYYY) */}
              <input
                type="text"
                value={birth.year}
                onChange={(e) => setBirth({ ...birth, year: e.target.value })} // 기존 값(...birth) 유지하고 년도만 수정
                className="w-full text-center focus:outline-none"
                placeholder="YYYY"
                maxLength={4} // 4글자 제한
              />
              <span className="mx-2 text-gray-600">/</span>

              {/* 2. 월 (MM) */}
              <input
                type="text"
                value={birth.month}
                onChange={(e) => setBirth({ ...birth, month: e.target.value })}
                className="w-full text-center focus:outline-none"
                placeholder="MM"
                maxLength={2}
              />
              <span className="mx-2 text-gray-600">/</span>

              {/* 3. 일 (DD) */}
              <input
                type="text"
                value={birth.day}
                onChange={(e) => setBirth({ ...birth, day: e.target.value })}
                className="w-full text-center focus:outline-none"
                placeholder="DD"
                maxLength={2}
              />
            </div>
            {/* ✨ 에러 메시지 (빨간 글씨) */}
            {errors.birth && <p className="mt-1 text-xs text-error">{errors.birth}</p>}
          </div>

          {/* 이메일 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-600">이메일</label>
            <div className="relative">
              <input
                type="email"
                defaultValue="honggil2000@naver.com"
                disabled
                className="w-full cursor-not-allowed rounded border border-gray-200 bg-gray-50 p-3 text-gray-600"
              />
              <div className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center">
                <Icon name="icon-lock" className="h-full w-full text-gray-600" />
              </div>
            </div>
          </div>

          {/* 성별 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-600">성별</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setGender(gender === "male" ? null : "male");
                  setErrors({ ...errors, gender: "" });
                }} // 클릭 시 에러 삭제
                // ✨ 에러 발생 시: border-error text-error (빨간 테두리+글씨)
                // ✨ 선택됨: border-brand-primary bg-white text-brand-primary
                // ✨ 평소: border-gray-200 bg-gray-50 text-gray-600
                className={`w-32 rounded border py-3 font-bold transition-colors ${
                  errors.gender
                    ? "border-error bg-white text-error"
                    : gender === "male"
                      ? "border-brand-primary bg-white text-brand-primary"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                남성
              </button>
              <button
                type="button"
                onClick={() => {
                  setGender(gender === "female" ? null : "female");
                  setErrors({ ...errors, gender: "" });
                }}
                className={`w-32 rounded border py-3 font-bold transition-colors ${
                  errors.gender
                    ? "border-error bg-white text-error"
                    : gender === "female"
                      ? "border-brand-primary bg-white text-brand-primary"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                여성
              </button>
            </div>
            {/* ✨ 에러 메시지: 버튼 아래에 표시 */}
            {errors.gender && <p className="mt-1 text-xs text-error">{errors.gender}</p>}
          </div>

          {/* 저장 버튼 */}
          <button
            //수정완료 모달 연결 + 유효성 검사 함수 연결
            onClick={handleSaveProfile}
            className="mt-4 w-full rounded bg-brand-primary py-4 text-lg font-bold text-white transition-colors hover:bg-brand-primary"
          >
            개인정보 저장
          </button>
        </div>
      </div>

      {/* === 하단: 보안설정 & 회원탈퇴 === */}
      <div className="mt-16 space-y-12">
        {/* 보안설정 */}
        <section>
          <h3 className="mb-1 text-lg font-bold text-gray-950">보안설정</h3>
          <p className="mb-4 text-sm text-gray-600">
            계정 보안을 위해 주기적인 비밀번호 변경을 권장해요.
          </p>
          <button
            //setInfoView 대신에 navigate 사용
            onClick={() => navigate("/my/password")}
            className="group flex w-full items-center justify-between rounded border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <span className="font-bold text-gray-950">비밀번호 변경</span>
            <div className="flex h-5 w-5 items-center justify-center transition-transform group-hover:translate-x-1">
              {/* ✨ [수정] 화살표 아이콘 적용 */}
              <Icon name="icon-arrow" className="h-full w-full text-gray-600" />
            </div>
          </button>
        </section>

        {/* 회원탈퇴 */}
        <section>
          <h3 className="mb-1 text-lg font-bold text-gray-950">회원탈퇴</h3>
          <p className="mb-4 text-sm text-gray-600">
            회원탈퇴를 신청하기 전에 아래 사항을 꼭 확인해 주세요.
          </p>

          <div className="mb-4 rounded bg-gray-50 p-6 text-sm leading-relaxed text-gray-900">
            1. 회원 탈퇴 시 회원님의 개인정보는 관련 법령에 따라 일정 기간 보관 후 삭제됩니다.
            <br />
            2. 탈퇴 후에는 아이디 및 보유 혜택이 모두 소멸되며, 복구가 불가능합니다.
          </div>

          <button
            //회원탈퇴 모달
            onClick={() => openModal(ModalType.MY_WITHDRAW_NOTICE)}
            className="group flex w-full items-center justify-between rounded border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <span className="font-bold text-gray-950">회원탈퇴</span>
            <div className="flex h-5 w-5 items-center justify-center transition-transform group-hover:translate-x-1">
              {/* ✨ [수정] 화살표 아이콘 적용 */}
              <Icon name="icon-arrow" className="h-full w-full text-gray-600" />
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
        {/* ✨ [수정] 피그마 규격(H: 85) 반영 */}
        <div className="h-[85px]">
          <img src={logoData} alt="VeriDoc Logo" className="h-full w-auto" />
        </div>
      </div>

      {/* 탭 메뉴 (피그마 규격 777x69 반영) */}
      <div className="mb-8 flex h-[69px] w-full max-w-[777px] items-center rounded-[10px] bg-gray-50 p-1.5">
        {/* 1. 나의 증상 관리 탭 */}
        <button
          className={`h-full flex-1 rounded-[10px] text-lg font-bold transition-all duration-200 ${
            activeTab === "symptom"
              ? "bg-white text-gray-950 shadow-sm" // 선택됨: 흰배경 + 진한글씨
              : "text-gray-600 hover:text-gray-900" // 선택안됨: 회색글씨
          }`}
          onClick={() => setActiveTab("symptom")}
        >
          나의 증상 관리
        </button>

        {/* 2. 정보 수정 탭 */}
        <button
          className={`h-full flex-1 rounded-[10px] text-lg font-bold transition-all duration-200 ${
            activeTab === "info"
              ? "bg-white text-gray-950 shadow-sm" // 선택됨
              : "text-gray-600 hover:text-gray-900" // 선택안됨
          }`}
          onClick={() => {
            setActiveTab("info");
          }}
        >
          정보 수정
        </button>
      </div>

      {activeTab === "symptom" ? renderSymptomContent() : renderProfileForm()}
    </div>
  );
};

export default MyPage;
