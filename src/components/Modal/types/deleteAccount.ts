export interface DeleteAccountResponse {
  code: number; // 200
  message: string; // "요청이 완료되었습니다."
  data: object; // {}
}

/* 회원탈퇴 API 에러 응답 타입 (401, 500 등) */
export interface DeleteAccountError {
  code: string | number;
  message: string;
  data: null;
}
