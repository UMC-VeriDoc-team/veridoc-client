interface BottomLinksProps {
  onClickFindPassword: () => void;
  onClickSignup: () => void;
}

const BottomLinks = ({ onClickFindPassword, onClickSignup }: BottomLinksProps) => {
  return (
    <div className="flex items-center justify-center text-[13px] leading-[1.4] tracking-[-0.025em] text-gray-200">
      <span>비밀번호를 잊으셨나요?</span>
      <button
        type="button"
        onClick={onClickFindPassword}
        className="ml-[4px] font-medium text-brand-primary"
      >
        비밀번호 찾기
      </button>

      <span className="mx-[10px] text-gray-300">|</span>

      <span>계정이 없으신가요?</span>
      <button
        type="button"
        onClick={onClickSignup}
        className="ml-[4px] font-medium text-brand-primary"
      >
        회원가입
      </button>
    </div>
  );
};

export default BottomLinks;
