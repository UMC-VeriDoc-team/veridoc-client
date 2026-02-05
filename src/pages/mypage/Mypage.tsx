import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import Icon from "../../components/Icon/Icon";
import Logo from "/images/logo.svg";
import SymptomGrid from "@/components/Symptom/SymptomGrid";
import Button from "@/components/Button/Button";
import GenderSelect, { type Gender } from "@/components/Select/GenderSelect";

const MyPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") === "info" ? "info" : "symptom";
  const [isEditing, setIsEditing] = useState(false);
  const { openModal } = useBaseModal();

  // 프로필 관련 State
  const [name, setName] = useState("홍길동");
  const [gender, setGender] = useState<Gender>("MALE");
  const [birth, setBirth] = useState({ year: "2000", month: "11", day: "10" });
  const [errors, setErrors] = useState({ name: "", birth: "", gender: "" });
  const [selectedKey, setSelectedKey] = useState<string | null>("knee");
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // 증상 선택 로직
  const handleSelectSymptom = (key: string) => {
    if (!isEditing) return;

    setSelectedKey((prev) => {
      if (prev === key) return null;
      return key;
    });
  };

  // 증상 저장 로직
  const handleSaveSymptom = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setIsEditing(false);

    if (selectedKey === null) {
      openModal(ModalType.MY_SYMPTOM_NOT_SELECTED);
    } else {
      openModal(ModalType.MY_SYMPTOM_CHANGED);
    }
  };

  // 프로필 저장 로직
  const handleSaveProfile = () => {
    if (!isProfileEditing) {
      setIsProfileEditing(true);
      return;
    }

    const newErrors = { name: "", birth: "", gender: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "이름을 입력해주세요";
      isValid = false;
    }

    if (!gender) {
      newErrors.gender = "필수 선택 사항입니다";
      isValid = false;
    }

    const { year, month, day } = birth;
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const currentYear = new Date().getFullYear();

    if (!year || !month || !day || Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) {
      newErrors.birth = "생년월일을 모두 숫자로 입력해주세요";
      isValid = false;
    } else if (y < 1900 || y > currentYear || m < 1 || m > 12 || d < 1 || d > 31) {
      newErrors.birth = "생년월일 형식이 올바르지 않습니다";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    openModal(ModalType.MY_PROFILE_UPDATED);
    setIsProfileEditing(false);
  };

  // -----------------------------------------------------------------------
  // [화면 1] 나의 증상 관리
  // -----------------------------------------------------------------------
  const renderSymptomContent = () => (
    <>
      <div className="mt-[30px] px-[30px] text-left md:mt-[60px] md:px-0 md:text-center">
        {/* [제목] 파란 글씨 */}
        <h2 className="mb-0 text-[32px] font-extrabold leading-[1.4] tracking-[-0.025em] text-brand-primary md:text-4xl">
          {isEditing ? (
            <>
              <span className="md:hidden">
                현재 확인 중인 <br /> 증상을 변경해 보세요
              </span>

              <span className="hidden md:inline">현재 확인 중인 증상을 변경해 보세요</span>
            </>
          ) : (
            <>
              <span className="md:hidden">
                현재 확인 중인 <br /> 증상이에요
              </span>

              <span className="hidden md:inline">현재 확인 중인 증상이에요</span>
            </>
          )}
        </h2>

        <p className="mt-[10px] break-keep text-[18px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-950 md:mt-4 md:text-lg">
          <span className="md:hidden">
            다른 증상을 확인하고 싶다면 선택을 변경할 수 있어요 필요하다면 증상을 선택하지 않고
            넘어갈 수도 있어요
          </span>

          <span className="hidden md:inline">
            다른 증상을 확인하고 싶다면 선택을 변경할 수 있어요
            <br />
            필요하다면 증상을 선택하지 않고 넘어갈 수도 있어요
          </span>
        </p>
      </div>

      {/* 2. 그리드 영역 */}
      <div
        className={`mt-[100px] flex w-full justify-center px-[30px] md:mt-[70px] md:px-0 ${!isEditing ? "pointer-events-none opacity-80" : ""} `}
      >
        <SymptomGrid
          selectedKey={selectedKey}
          multiAttemptedKey={null}
          onSelect={handleSelectSymptom}
        />
      </div>

      {/* 3. 버튼 영역 */}
      <div className="mb-20 mt-[70px] w-full px-[30px] md:mt-[100px] md:w-[400px]">
        <Button
          onClick={handleSaveSymptom}
          className="text-[18px] font-semibold leading-[1.4] tracking-[-0.025em]"
        >
          {isEditing ? "저장하기" : "수정하기"}
        </Button>
      </div>
    </>
  );

  // 정보 수정 탭
  const renderProfileForm = () => (
    <div className="mb-20 flex w-full flex-col px-[30px] lg:mt-12 lg:w-[777px]">
      <h3 className="mb-[30px] mt-[30px] w-full text-left text-[20px] font-semibold leading-[24px] text-gray-950 lg:mb-6 lg:mt-0 lg:font-bold">
        개인정보 수정
      </h3>

      {/* === 상단: 프로필 수정 폼 === */}
      <div className="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-between">
        {/* 1. 프로필 사진 */}
        <div className="flex flex-col items-center lg:block">
          <div className="relative">
            <div className="flex h-[218.4px] w-[218.4px] items-center justify-center overflow-hidden rounded-full border-[4px] border-brand-primary bg-gray-50 lg:h-[275px] lg:w-[275px]">
              <Icon
                name={gender === "FEMALE" ? "female" : "male"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2. 입력 폼 */}
        <div className="mt-[30px] flex w-full flex-col space-y-4 lg:mt-0 lg:w-[405px]">
          {/* 이름 */}
          <div>
            <label className="mb-2 block text-[14px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-200">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isProfileEditing}
              className={`w-full rounded border bg-white p-3 focus:outline-none ${
                !isProfileEditing ? "cursor-not-allowed text-gray-400" : "text-gray-950"
              } ${
                errors.name
                  ? "border-error focus:border-error"
                  : "border-gray-200 focus:border-brand-primary"
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
          </div>

          {/* 생년월일 */}
          <div>
            <label className="mb-2 block text-[14px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-200">
              생년월일
            </label>
            <div
              className={`flex w-full items-center rounded border p-3 ${
                errors.birth
                  ? "border-error focus-within:border-error"
                  : "border-gray-200 focus-within:border-brand-primary"
              }`}
            >
              <input
                type="text"
                value={birth.year}
                onChange={(e) => setBirth({ ...birth, year: e.target.value })}
                disabled={!isProfileEditing}
                className={`w-full bg-transparent text-center focus:outline-none ${
                  !isProfileEditing && "cursor-not-allowed text-gray-400"
                }`}
                placeholder="YYYY"
                maxLength={4}
              />
              <span className="mx-2 text-gray-600">/</span>
              <input
                type="text"
                value={birth.month}
                onChange={(e) => setBirth({ ...birth, month: e.target.value })}
                className={`w-full bg-transparent text-center focus:outline-none ${
                  !isProfileEditing && "cursor-not-allowed text-gray-400"
                }`}
                placeholder="MM"
                maxLength={2}
              />
              <span className="mx-2 text-gray-600">/</span>
              <input
                type="text"
                value={birth.day}
                onChange={(e) => setBirth({ ...birth, day: e.target.value })}
                className={`w-full bg-transparent text-center focus:outline-none ${
                  !isProfileEditing && "cursor-not-allowed text-gray-400"
                }`}
                placeholder="DD"
                maxLength={2}
              />
            </div>
            {errors.birth && <p className="mt-1 text-xs text-error">{errors.birth}</p>}
          </div>

          {/* 이메일 */}
          <div>
            <label className="mb-2 block text-[14px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-200">
              이메일
            </label>
            <div className="relative">
              <input
                type="email"
                defaultValue="honggil2000@naver.com"
                disabled
                className="w-full cursor-not-allowed rounded border border-gray-200 bg-gray-50 p-3 text-gray-950"
              />
              <div className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center">
                <Icon name="lock" className="h-full w-full text-gray-200" />
              </div>
            </div>
          </div>

          {/* 성별 */}
          <div>
            <label className="mb-2 block text-[14px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-200">
              성별
            </label>
            <GenderSelect value={gender} onChange={setGender} />
          </div>

          {/* 저장 버튼 */}
          <div className="pt-[40px] lg:pt-0">
            <Button onClick={handleSaveProfile}>
              {isProfileEditing ? "개인정보 저장" : "개인정보 수정"}
            </Button>
          </div>
        </div>
      </div>

      {/* === 하단: 보안설정 & 회원탈퇴 === */}
      <div className="mb-[100px] mt-[60px] space-y-[60px]">
        {/* 보안설정 섹션 */}
        <section>
          <h3 className="mb-2 text-[20px] font-bold text-gray-950">보안설정</h3>
          <p className="mb-4 text-[18px] font-medium text-gray-950">
            계정 보안을 위해 주기적인 비밀번호 변경을 권장해요.
          </p>
          <button
            onClick={() => navigate("/my/password")}
            className="flex w-full items-center justify-between rounded border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <span className="text-[18px] font-semibold text-gray-950">비밀번호 변경</span>
            <div className="flex h-5 w-5 items-center justify-center transition-transform">
              <Icon name="arrow-gray" className="h-full w-full text-gray-600" />
            </div>
          </button>
        </section>

        {/* 회원탈퇴 섹션 */}
        <section>
          <h3 className="mb-2 text-[20px] font-bold text-gray-950">회원탈퇴</h3>
          <p className="mb-4 text-[18px] font-medium text-gray-950">
            회원탈퇴를 신청하기 전에 아래 사항을 꼭 확인해 주세요.
          </p>
          <div className="mb-4 rounded bg-gray-50 px-6 py-9 text-[18px] font-medium leading-[1.6] text-gray-950">
            1. 회원 탈퇴 시 회원님의 개인정보는 관련 법령에 따라 일정 기간 보관 후 삭제됩니다.
            <br />
            2. 탈퇴 후에는 아이디 및 보유 혜택이 모두 소멸되며, 복구가 불가능합니다.
          </div>
          <button
            onClick={() => openModal(ModalType.MY_WITHDRAW_NOTICE)}
            className="flex w-full items-center justify-between rounded border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <span className="text-[18px] font-semibold text-gray-950">회원탈퇴</span>
            <div className="flex h-5 w-5 items-center justify-center transition-transform">
              <Icon name="arrow-gray" className="h-full w-full text-gray-600" />
            </div>
          </button>
        </section>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <header className="flex w-full items-center justify-center pt-[14px] md:hidden">
        <span className="text-[20px] font-semibold text-gray-950">마이페이지</span>
      </header>

      {/* 2. [Logo] 로고 영역 */}
      <div className="hidden md:mb-8 md:mt-10 md:flex md:items-center md:justify-center">
        <div className="h-[85px]">
          <img src={Logo} alt="VeriDoc Logo" className="h-full w-auto" />
        </div>
      </div>

      {/* 3. [Tabs] 탭 영역 */}
      <div className="mb-8 mt-[24px] flex w-full justify-center px-[30px] md:mt-0 md:w-[777px] md:px-0">
        {/* 실제 탭 컨테이너 (회색 박스) */}
        <div className="flex h-[49px] w-full items-center justify-center rounded-[10px] bg-gray-50 p-[4px] md:h-[69px]">
          {/* [Tab 1] 나의 증상 관리 */}
          <button
            className={`flex h-full flex-1 items-center justify-center rounded-[7px] text-[18px] font-semibold tracking-[-0.025em] transition-all duration-200 md:text-[20px] md:font-bold ${
              activeTab === "symptom"
                ? "bg-white text-gray-950 shadow-sm"
                : "bg-transparent text-gray-400"
            } `}
            onClick={() => setSearchParams({ tab: "symptom" })}
          >
            나의 증상 관리
          </button>

          {/* [Tab 2] 정보 수정 */}
          <button
            className={`flex h-full flex-1 items-center justify-center rounded-[7px] text-[18px] font-semibold tracking-[-0.025em] transition-all duration-200 md:text-[20px] md:font-bold ${
              activeTab === "info"
                ? "bg-white text-gray-950 shadow-sm"
                : "bg-transparent text-gray-400"
            } `}
            onClick={() => setSearchParams({ tab: "info" })}
          >
            정보 수정
          </button>
        </div>
      </div>

      {/* 컨텐츠 렌더링 (이건 아까 수정한 함수들이 실행됨) */}
      {activeTab === "symptom" ? renderSymptomContent() : renderProfileForm()}
    </div>
  );
};

export default MyPage;
