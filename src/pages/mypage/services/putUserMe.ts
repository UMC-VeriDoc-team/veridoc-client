import type { Gender } from "@/components/Select/GenderSelect";
import { authApiWrapper } from "@/utils/api/api";

export type PatchUserMeRequest = {
  name: string;
  birth: string;
  gender: Gender;
};

export const putUserMe = async (payload: PatchUserMeRequest) => {
  return await authApiWrapper.put<Record<string, never>>("/users/me/profile", payload);
};
