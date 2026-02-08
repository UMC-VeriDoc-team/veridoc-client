import type { Gender } from "@/components/Select/GenderSelect";
import { authApiWrapper } from "@/utils/api/api";

export interface GetUserDataResponse {
  user_id: number;
  name: string;
  email: string;
  birth: string;
  gender: Gender;
  painAreaID: number | null;
}

// 사용자 정보 조회
const getUserData = async () => {
  const res = await authApiWrapper.get<GetUserDataResponse>("/users/me");
  return res.data;
};

export default getUserData;
