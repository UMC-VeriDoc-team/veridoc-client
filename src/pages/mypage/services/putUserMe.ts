import { authApiWrapper } from "@/utils/api/api";

export type PatchUserMeRequest = {
  name: string;
  birth: string;
  gender: "MALE" | "FEMALE";
};

export const putUserMe = async (payload: PatchUserMeRequest) => {
  return await authApiWrapper.put<Record<string, never>>("/users/me/profile", payload);
};
