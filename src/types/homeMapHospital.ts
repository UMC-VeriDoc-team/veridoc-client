import type { HospitalMapItem } from "@/libs/kakaoMap";

// 병원 좌표
export interface LatLng {
  lat: number;
  lng: number;
}

// API 응답
export interface GetNearbyHospitalResponse {
  hospitals: HospitalMapItem[];
}
