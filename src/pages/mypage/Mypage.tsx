import { useState } from "react";
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

const MOCK_CURRENT_PASSWORD = "12345678";
const MyPage = () => {
  //상태관리
  const [activeTab, setActiveTab] = useState<"symptom" | "info">("symptom");
  const [infoView, setInfoView] = useState<"profile" | "password">("profile"); //정보 수정탭 안에서 '프로필'을 볼지 '비밀번호'를 볼지 결정하는 상태
  const [isEditing, setIsEditing] = useState(false);
  const { openModal } = useBaseModal();

  //프로필 관련 State
  const [name, setName] = useState("홍길동");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birth, setBirth] = useState({ year: "2000", month: "11", day: "10" });
  const [errors, setErrors] = useState({ name: "", birth: "", gender: "" });
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([1, 2, 3]);

  // ... (기존 passwordForm은 유지)
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // ✨ [수정] 에러를 각 칸별로 따로 관리 (current, new, confirm)
  const [pwdErrors, setPwdErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // -----------------------------------------------------------------------
  // [로직] 증상 클릭 시 선택/해제 (토글)
  // -----------------------------------------------------------------------
  const handleToggleSymptom = (id: number) => {
    if (!isEditing) return; // 수정 모드가 아니면 클릭 막기

    setSelectedSymptoms(
      (prev) =>
        prev.includes(id)
          ? prev.filter((s) => s !== id) // 이미 있으면 뺌 (선택 해제)
          : [...prev, id] // 없으면 넣음 (선택)
    );
  };

  // -----------------------------------------------------------------------
  // [로직 함수들]
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // [로직] 증상 저장 버튼 클릭 (모달 분기 처리: 미선택 vs 선택)
  // -----------------------------------------------------------------------
  const handleSaveSymptom = () => {
    // 1. 수정하기 버튼을 눌렀을 때 (View -> Edit)
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // 2. 저장하기 버튼을 눌렀을 때 (Edit -> View)
    // 일단 저장(편집 종료)은 무조건 시킵니다. (디자인 흐름 반영)
    setIsEditing(false);

    // 3. 선택된 개수에 따라 다른 모달 띄우기
    if (selectedSymptoms.length === 0) {
      // 🚨 0개 선택: "증상을 선택하지 않은 상태로 저장됩니다" 모달
      openModal(ModalType.MY_SYMPTOM_NOT_SELECTED);
    } else {
      // ✅ 1개 이상 선택: "선택한 증상이 변경되었어요" 모달
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
      newErrors.birth = "생년월일 형식이 올바르지 않습니다"; // 👈 피그마 문구
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
  // [로직] 비밀번호 변경 (피그마 UI + 윤주님 8자 규칙)
  // -----------------------------------------------------------------------
  const handleSavePassword = () => {
    const { current, new: newPwd, confirm } = passwordForm;
    const newErrors = { current: "", new: "", confirm: "" };
    let isValid = true;

    // 1. 빈 칸 검사 (필수 입력)
    if (!current) {
      newErrors.current = "필수 입력 사항입니다";
      isValid = false;
    }
    if (!newPwd) {
      newErrors.new = "필수 입력 사항입니다";
      isValid = false;
    }
    if (!confirm) {
      newErrors.confirm = "필수 입력 사항입니다";
      isValid = false;
    }
    // ✨ [추가] 임시 비밀번호 검증 로직
    // TODO: [백엔드 연동 시 수정] 지금은 프론트에서 가짜로 검사하지만, 나중엔 API 에러로 처리해야 함
    // ---------------------------------------------------------
    // 현재 비밀번호가 "12345678"이 아니면 에러!
    // 빈 칸이 아닐 때(current가 있을 때)만 검사합니다.
    if (current && current !== MOCK_CURRENT_PASSWORD) {
      newErrors.current = "기존 비밀번호를 입력해주세요";
      isValid = false;
    }
    // ---------------------------------------------------------

    // 2. 새 비밀번호 길이 검사 (8자 미만이면 즉시 탈락)
    // (빈 칸이 아닐 때만 검사)
    if (newPwd && newPwd.length < 8) {
      newErrors.new = "새 비밀번호 형식이 올바르지 않습니다";
      isValid = false;
    }

    // 3. 일치 검사
    // (빈 칸이 아니고, 형식도 맞을 때만 검사)
    if (confirm && newPwd !== confirm) {
      newErrors.confirm = "입력한 비밀번호가 서로 일치하는지 확인해 주세요";
      isValid = false;
    }

    // 에러 상태 업데이트
    setPwdErrors(newErrors);

    // 🛑 [중요] 프론트엔드 유효성 검사 실패 시 여기서 즉시 중단
    if (!isValid) return;

    // -----------------------------------------------------------
    // 🔒 [보안] 현재 비밀번호가 맞는지 확인하는 단계
    // 원래는 여기서 백엔드 API를 호출해서 확인해야 합니다.
    // 지금은 API가 없으므로 "서버가 OK 했다"고 가정하고 넘어가지만,
    // 나중에는 서버에서 에러가 오면 alert("현재 비밀번호가 틀렸습니다")를 띄워야 합니다.
    // -----------------------------------------------------------

    // 4. 모든 관문 통과! -> 성공 모달 오픈
    openModal(ModalType.AUTH_PASSWORD_CHANGED);
  };
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

      {/* 증상 그리드 수정된 map 로직*/}
      <div className="mt-12 grid grid-cols-3 gap-6">
        {SYMPTOMS.map((item) => {
          // 선택 여부 확인
          const isSelected = selectedSymptoms.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleToggleSymptom(item.id)} // 클릭 이벤트
              className={`flex h-[180px] w-[180px] cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all hover:shadow-md ${
                isSelected
                  ? "border-blue-500 shadow-md ring-2 ring-blue-500" // 선택됨: 파란색
                  : "border-gray-100" // 해제됨: 회색
              } ${!isEditing ? "cursor-default opacity-80" : ""}`} // 수정 모드 아닐 땐 흐리게
            >
              <div className="h-[75%] w-full bg-gray-50">
                <Icon name={item.iconName} className="h-full w-full object-cover" />
              </div>
              <div
                className={`flex h-[25%] w-full items-center justify-center border-t bg-white ${isSelected ? "border-blue-100" : "border-gray-50"}`}
              >
                <span
                  className={`text-lg font-bold ${isSelected ? "text-blue-600" : "text-gray-700"}`}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-20 mt-16">
        <button
          onClick={() => handleSaveSymptom()}
          className="w-[400px] rounded-lg bg-blue-500 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600"
        >
          {isEditing ? "저장하기" : "수정하기"}
        </button>
      </div>
    </>
  );

  // -----------------------------------------------------------------------
  // 정보 수정 > 비밀번호 변경
  // -----------------------------------------------------------------------
  // ② 비밀번호 변경 화면 (피그마 디자인 완벽 반영)
  const renderPasswordForm = () => {
    // ✨ [수정 1] 초록불 조건 강화: "일치함" + "8자 이상" + "빈칸 아님" 모두 만족해야 뜸
    const isMatchSuccess =
      passwordForm.new && passwordForm.new === passwordForm.confirm && passwordForm.new.length >= 8;

    // 🛠️ 공통 입력 핸들러 (입력 시 에러 메시지 즉시 삭제 기능 추가)
    const handleChange = (field: "current" | "new" | "confirm", value: string) => {
      setPasswordForm((prev) => ({ ...prev, [field]: value }));

      // ✨ [수정 2] 사용자가 타이핑을 시작하면 해당 칸의 빨간 에러를 즉시 지워줌 (UX 개선)
      if (pwdErrors[field]) {
        setPwdErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

    return (
      <div className="mb-20 mt-16 flex w-full max-w-[400px] flex-col">
        <div className="mb-12 text-center md:text-left">
          <h2 className="mb-2 text-lg font-bold text-black">비밀번호 변경</h2>
          <p className="text-sm text-gray-500">계정 보안을 위해 현재 비밀번호를 먼저 확인합니다</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* 1. 현재 비밀번호 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              현재 비밀번호<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              value={passwordForm.current}
              onChange={(e) => handleChange("current", e.target.value)}
              className={`w-full rounded-lg border p-4 focus:outline-none ${
                pwdErrors.current
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {pwdErrors.current && <p className="mt-2 text-sm text-red-500">{pwdErrors.current}</p>}
          </div>

          {/* 2. 새 비밀번호 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              새 비밀번호<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="새 비밀번호를 입력해주세요 (8자 이상)"
              value={passwordForm.new}
              onChange={(e) => handleChange("new", e.target.value)}
              className={`w-full rounded-lg border p-4 focus:outline-none ${
                pwdErrors.new
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {pwdErrors.new && <p className="mt-2 text-sm text-red-500">{pwdErrors.new}</p>}
          </div>

          {/* 3. 새 비밀번호 확인 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              새 비밀번호 확인<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              value={passwordForm.confirm}
              onChange={(e) => handleChange("confirm", e.target.value)}
              className={`w-full rounded-lg border p-4 focus:outline-none ${
                pwdErrors.confirm
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {/* 🚨 불일치 에러 (빨간색) */}
            {pwdErrors.confirm && <p className="mt-2 text-sm text-red-500">{pwdErrors.confirm}</p>}

            {/* ✅ 일치 성공 (초록색) - 조건 만족 시에만 노출 */}
            {isMatchSuccess && (
              <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                <span>✔</span>
                <span>입력한 비밀번호가 서로 일치합니다</span>
              </div>
            )}
          </div>

          <button
            onClick={handleSavePassword}
            className="mt-4 w-full rounded-lg bg-blue-500 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600"
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    );
  };

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
          <h3 className="mb-6 w-full text-left text-lg font-bold text-black">개인정보 수정</h3>
          <div className="relative">
            <div className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border-4 border-blue-500 bg-gray-50">
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
            <label className="mb-2 block text-sm font-bold text-gray-500">이름</label>
            <input
              type="text"
              value={name} // ✨ [수정] state 변수 연결
              onChange={(e) => setName(e.target.value)} // ✨ [수정] 입력할 때마다 state 변경
              //에러가 있으면 (errors.name) 빨간 테두리 추가, 없으면 회색/파란색
              className={`w-full rounded-md border p-3 text-black focus:outline-none ${
                errors.name
                  ? "border-red-500 focus:border-red-500" // 에러일 때 스타일
                  : "border-gray-300 focus:border-blue-500" // 정상일 때 스타일
              }`}
            />
            {/* ✨ 에러 메시지가 있을 때만 빨간 글씨 보여주기 */}
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* 생년월일 (3단 분리 + 유효성 검사) */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-500">생년월일</label>

            {/* 겉보기엔 하나의 박스지만, 실제론 3개의 입력칸이 들어있는 컨테이너 */}
            <div
              className={`flex w-full items-center rounded-md border p-3 focus-within:ring-2 ${
                errors.birth
                  ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500" // 에러: 빨강
                  : "border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-500" // 정상: 파랑
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
              <span className="mx-2 text-gray-400">/</span>

              {/* 2. 월 (MM) */}
              <input
                type="text"
                value={birth.month}
                onChange={(e) => setBirth({ ...birth, month: e.target.value })}
                className="w-full text-center focus:outline-none"
                placeholder="MM"
                maxLength={2}
              />
              <span className="mx-2 text-gray-400">/</span>

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
            {errors.birth && <p className="mt-1 text-xs text-red-500">{errors.birth}</p>}
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
                <Icon name="icon-lock" className="h-full w-full text-gray-400" />
              </div>
            </div>
          </div>

          {/* 성별 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-500">성별</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setGender(gender === "male" ? null : "male");
                  setErrors({ ...errors, gender: "" });
                }} // 클릭 시 에러 삭제
                // ✨ 에러 발생 시: border-red-500 text-red-500 (빨간 테두리+글씨)
                // ✨ 선택됨: border-blue-500 bg-white text-blue-500
                // ✨ 평소: border-gray-200 bg-gray-50 text-gray-400
                className={`w-32 rounded-md border py-3 font-bold transition-colors ${
                  errors.gender
                    ? "border-red-500 bg-white text-red-500"
                    : gender === "male"
                      ? "border-blue-500 bg-white text-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100"
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
                className={`w-32 rounded-md border py-3 font-bold transition-colors ${
                  errors.gender
                    ? "border-red-500 bg-white text-red-500"
                    : gender === "female"
                      ? "border-blue-500 bg-white text-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                여성
              </button>
            </div>
            {/* ✨ 에러 메시지: 버튼 아래에 표시 */}
            {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
          </div>

          {/* 저장 버튼 */}
          <button
            //수정완료 모달 연결 + 유효성 검사 함수 연결
            onClick={handleSaveProfile}
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
            onClick={() => setInfoView("password")}
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
          onClick={() => {
            setActiveTab("info");
            setInfoView("profile"); //정보수정 탭 누르면 프로필 수정화면으로 초기화
          }}
        >
          정보 수정
        </button>
      </div>

      {activeTab === "symptom"
        ? renderSymptomContent()
        : infoView === "profile"
          ? renderProfileForm()
          : renderPasswordForm()}
    </div>
  );
};

export default MyPage;
