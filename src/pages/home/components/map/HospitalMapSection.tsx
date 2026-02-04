import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import KakaoHospitalMap from "./KakaoHospitalMap";
import type { HospitalMapItem, LatLng } from "@/libs/kakaoMap";

type UserLocation = LatLng & { accuracy: number };

type NearbyResponse = {
  hospitals: HospitalMapItem[];
};

const DEFAULT_CENTER: LatLng = { lat: 37.5563, lng: 126.9236 }; // 초기 위치

const fetchNearbyHospitals = async (
  lat: number,
  lng: number,
  limit = 3
): Promise<NearbyResponse> => {
  const qs = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    limit: String(limit),
  });

  const res = await fetch(`/hospitals/nearby?${qs.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`nearby fetch failed: ${res.status}`);
  }

  return (await res.json()) as NearbyResponse;
};

const HospitalMapSection = () => {
  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const [hospitals, setHospitals] = useState<HospitalMapItem[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);

  const [locationError, setLocationError] = useState<string>("");

  // API 과호출 방지 디바운스
  const debounceRef = useRef<number | null>(null);

  // 내 위치 계속 갱신
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("이 브라우저에서는 위치 기능을 사용할 수 없어요.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const nextCenter: LatLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const nextUser: UserLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Number.isFinite(pos.coords.accuracy) ? pos.coords.accuracy : 0,
        };

        setCenter(nextCenter);
        setUserLocation(nextUser);
        setLocationError("");
      },
      (err) => {
        if (err.code === 1) {
          setLocationError(
            "위치 권한이 거부되어 있어요. 브라우저 설정에서 위치 권한을 허용해 주세요."
          );
        } else if (err.code === 2) {
          setLocationError(
            "현재 위치를 가져올 수 없어요. 기기 위치 서비스/네트워크를 확인해 주세요."
          );
        } else if (err.code === 3) {
          setLocationError("위치 요청 시간이 초과됐어요. 다시 시도해 주세요.");
        } else {
          setLocationError("위치 정보를 가져올 수 없어요.");
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5_000,
        timeout: 10_000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // 위치 변경 시 nearby API 호출: 디바운스
  useEffect(() => {
    if (!userLocation) return;

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      void (async () => {
        try {
          const data = await fetchNearbyHospitals(userLocation.lat, userLocation.lng, 3);
          const list = data.hospitals ?? [];

          setHospitals(list);

          setSelectedHospitalId((prev) => {
            if (prev && list.some((h) => h.hospitalId === prev)) return prev;
            return list[0]?.hospitalId ?? null;
          });
        } catch {
          setHospitals([]);
        }
      })();
    }, 700);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [userLocation?.lat, userLocation?.lng]);

  const effectiveSelectedId = useMemo(() => {
    if (selectedHospitalId !== null) return selectedHospitalId;
    return hospitals[0]?.hospitalId ?? null;
  }, [selectedHospitalId, hospitals]);

  return (
    <section className="flex w-full border border-[#17171940]">
      {/* 왼쪽: 병원 목록 */}
      <article className="h-[500px] w-[40%] border-r border-[#17171940] p-4">
        {locationError && (
          <div className="mb-3 rounded-md bg-gray-50 p-3 text-xs text-red-600">{locationError}</div>
        )}

        <p className="p-[10px] text-base font-medium text-gray-950">
          <span className="font-semibold text-brand-primary">{hospitals.length}</span> 개 병원
        </p>

        <div className="flex h-full flex-col gap-y-[10px]">
          {hospitals.map((hospital) => (
            <div
              key={hospital.hospitalId}
              onClick={() => setSelectedHospitalId(hospital.hospitalId)}
              className="flex cursor-pointer gap-x-4 rounded-[10px] px-4 py-[14px] shadow-[0_4px_20px_0_rgba(32,32,32,0.06)]"
            >
              <div className="w-[145px] rounded-[5px] bg-gray-100" />
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-2">
                  <p className="text-lg font-semibold text-gray-950">{hospital.name}</p>
                  <div className="flex gap-x-[5px]">
                    <div className="rounded-[4px] bg-brand-primary px-2 py-[1px] text-sm font-medium text-white">
                      복통
                    </div>
                    <div className="rounded-[4px] border border-brand-primary bg-white px-2 py-[1px] text-sm font-medium text-brand-primary">
                      {hospital.category}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-x-[1px]">
                    <Icon name="map-location" className="h-4 w-4" />
                    <p className="text-sm font-medium text-gray-600">{hospital.address}</p>
                  </div>
                  <div className="flex items-center gap-x-[1px]">
                    <Icon name="map-walking" className="h-4 w-4" />
                    <p className="text-sm font-medium text-gray-600">
                      약 {hospital.distanceMeters}m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* 오른쪽: 지도 */}
      <article className="flex-1">
        <KakaoHospitalMap
          center={center}
          hospitals={hospitals}
          selectedHospitalId={effectiveSelectedId}
          onSelectHospital={setSelectedHospitalId}
        />
      </article>
    </section>
  );
};

export default HospitalMapSection;
