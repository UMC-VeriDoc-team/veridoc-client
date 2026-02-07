import { useState } from "react";
import { postSignup, type SignupPayload } from "../services/postSignup";
import type { AxiosError } from "axios";

type FieldKey = "name" | "email" | "password" | "birth" | "gender" | "painAreaID";
type FieldErrors = Partial<Record<FieldKey, string>>;

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({}); // 각 필드별 오류 메시지
  const [formError, setFormError] = useState(""); // 전체 폼 오류 메시지

  const clearFieldError = (key: FieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const signup = async (payload: SignupPayload) => {
    setLoading(true);
    setFieldErrors({});
    setFormError("");

    try {
      return await postSignup(payload);
    } catch (error: unknown) {
      // Axios 에러인지 여부 판별
      if (error instanceof Error && "isAxiosError" in error) {
        const axiosError = error as AxiosError<{
          code?: string;
        }>;

        const status = axiosError.response?.status;
        const code = axiosError.response?.data?.code;

        // 이메일 중복
        if (status === 409 || code === "EMAIL_ALREADY_EXISTS") {
          setFieldErrors({ email: "이미 가입된 이메일 주소입니다." });
          throw error;
        }

        // 입력값 검증 오류
        if (status === 400) {
          switch (code) {
            case "INVALID_EMAIL_FORMAT":
              setFieldErrors({ email: "이메일 형식이 올바르지 않습니다." });
              break;
            case "INVALID_PASSWORD_FORMAT":
              setFieldErrors({ password: "비밀번호 형식이 올바르지 않습니다." });
              break;
            case "INVALID_BIRTHDATE_FORMAT":
              setFieldErrors({ birth: "생년월일 형식이 올바르지 않습니다." });
              break;
            default:
              setFormError("입력값을 다시 확인해주세요.");
          }
          throw error;
        }
      }

      // 서버 오류 및 기타 알 수 없는 오류
      setFormError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fieldErrors, formError, clearFieldError, signup };
};
