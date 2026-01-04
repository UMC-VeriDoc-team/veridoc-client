export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string) => {
  if (!email.trim()) return "필수 입력 사항입니다";
  if (!EMAIL_REGEX.test(email)) return "이메일 형식이 올바르지 않습니다";
  return "";
};
