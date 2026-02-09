import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import KakaoHospitalMap from "./KakaoHospitalMap";
import type { HospitalMapItem, LatLng } from "@/libs/kakaoMap";
import getNearbyHospital from "@/pages/home/services/getNearbyHospital";
import { useAuthStore } from "@/stores/login/useAuthStore";

type UserLocation = LatLng & { accuracy: number };

const DEFAULT_CENTER: LatLng = { lat: 37.5563, lng: 126.9236 };

const SkeletonHospitalCard = () => {
  return (
    <div className="flex gap-x-4 rounded-[10px] border border-[#E9E9E9] px-4 py-[14px] shadow-[0_4px_20px_0_rgba(32,32,32,0.06)]">
      <div className="aspect-square min-w-[129px] animate-pulse rounded-[5px] bg-gray-100 sm:min-w-[145px]" />
      <div className="flex w-full flex-col gap-y-2 sm:justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="h-5 w-[70%] animate-pulse rounded bg-gray-100 sm:h-6" />
          <div className="flex gap-x-[5px]">
            <div className="h-5 w-1/2 animate-pulse rounded-[4px] bg-gray-100" />
            <div className="h-5 w-1/2 animate-pulse rounded-[4px] bg-gray-100" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-1">
            <div className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-gray-100" />
            <div className="h-4 w-[85%] animate-pulse rounded bg-gray-100" />
          </div>
          <div className="flex items-center gap-x-1">
            <div className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-gray-100" />
            <div className="h-4 w-[40%] animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

const HospitalMapSection = () => {
  const { painAreaID } = useAuthStore();

  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [hospitals, setHospitals] = useState<HospitalMapItem[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [hasStartedTracking, setHasStartedTracking] = useState(false);

  const debounceRef = useRef<number | null>(null);

  // 언마운트 시 디바운스 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  // 유저 버튼 클릭 시 일회성 위치 요청
  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setLocationError("이 브라우저에서는 위치 기능을 사용할 수 없어요.");
      return;
    }

    setIsLocating(true);
    setLocationError("");

    const applyPos = (pos: GeolocationPosition) => {
      const nextCenter: LatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      const nextUser: UserLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      };

      // 위치 정보 업데이트: 이 상태 변화가 병원 API 호출 useEffect 트리거
      setCenter(nextCenter);
      setUserLocation(nextUser);
      setLocationError("");
      setIsLocating(false);
      setHasStartedTracking(true);
    };

    const applyErr = (err: GeolocationPositionError) => {
      if (err.code === 1) {
        setLocationError("위치 권한이 거부되었습니다. 설정에서 허용해 주세요.");
      } else if (err.code === 2) {
        setLocationError("위치 정보를 가져올 수 없습니다. 네트워크를 확인해 주세요.");
      } else if (err.code === 3) {
        setLocationError("위치 요청 시간이 초과되었습니다.");
      } else {
        setLocationError("위치 정보를 가져오는 중 오류가 발생했습니다.");
      }
      setIsLocating(false);
    };

    navigator.geolocation.getCurrentPosition(applyPos, applyErr, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10_000,
    });
  };

  // 병원 API 조회
  useEffect(() => {
    if (!userLocation || !painAreaID) return;

    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      void (async () => {
        setIsLoading(true);
        try {
          const res = await getNearbyHospital({
            lat: userLocation.lat,
            lng: userLocation.lng,
            painAreaId: painAreaID,
            limit: 3,
          });

          const list = res.hospitals ?? [];
          setHospitals(list);

          // 첫 번째 병원 자동 선택
          setSelectedHospitalId((prev) => {
            if (prev && list.some((h) => h.hospitalId === prev)) return prev;
            return list[0]?.hospitalId ?? null;
          });
        } catch (e) {
          console.error("getNearbyHospital failed:", e);
          setHospitals([]);
        } finally {
          setIsLoading(false);
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
    <section className="flex w-full flex-col border border-[#17171940] md:h-[400px] md:flex-row lg:h-[670px]">
      {/* 지도 영역 */}
      <article className="order-1 h-[320px] w-full md:order-2 md:h-full md:flex-1">
        <KakaoHospitalMap
          center={center}
          hospitals={hospitals}
          selectedHospitalId={effectiveSelectedId}
          onSelectHospital={setSelectedHospitalId}
        />
      </article>

      {/* 리스트 영역 */}
      <article className="order-2 w-full overflow-hidden border-t border-[#17171940] p-4 md:order-1 md:h-full md:w-[40%] md:min-w-[400px] md:border-r md:border-t-0">
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={startLocationTracking}
            disabled={isLocating}
            className="h-9 rounded-[4px] bg-brand-primary px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isLocating
              ? "위치 확인 중..."
              : hasStartedTracking
                ? "위치로 새로고침"
                : "내 위치로 찾기"}
          </button>
        </div>

        {locationError && (
          <div className="mb-3 rounded-md bg-red-50 p-3 text-xs text-red-600">{locationError}</div>
        )}

        <p className="p-[10px] text-base font-medium text-gray-950">
          <span className="font-semibold text-brand-primary">{hospitals.length}</span> 개 병원
        </p>

        <div className="flex max-h-[320px] flex-col gap-y-[10px] overflow-y-auto sm:pb-2 md:h-full md:max-h-none">
          {isLoading ? (
            <>
              <SkeletonHospitalCard />
              <SkeletonHospitalCard />
              <SkeletonHospitalCard />
            </>
          ) : (
            hospitals.map((hospital) => {
              const isSelected = effectiveSelectedId === hospital.hospitalId;
              return (
                <div
                  key={hospital.hospitalId}
                  onClick={() => setSelectedHospitalId(hospital.hospitalId)}
                  className={[
                    "cursor-pointer rounded-[10px] border px-4 py-[14px] shadow-[0_4px_20px_0_rgba(32,32,32,0.06)] transition-colors hover:bg-gray-50/80",
                    isSelected ? "border-brand-primary bg-gray-50/50" : "border-[#E9E9E9]",
                  ].join(" ")}
                >
                  <div className="flex gap-x-4">
                    {hospital.imageUrl ? (
                      <img
                        src={hospital.imageUrl}
                        alt={hospital.name}
                        className="aspect-square min-w-[129px] rounded-[5px] object-cover sm:min-w-[145px]"
                      />
                    ) : (
                      <div className="aspect-square min-w-[129px] rounded-[5px] bg-gray-100 sm:min-w-[145px]" />
                    )}

                    <div className="flex w-full flex-col gap-y-2 sm:justify-between">
                      <div className="flex flex-col gap-y-2">
                        <p className="text-base font-semibold text-gray-950 sm:text-lg">
                          {hospital.name}
                        </p>
                        <div className="flex flex-wrap gap-x-[5px] gap-y-1">
                          <div className="rounded-[4px] bg-brand-primary px-2 text-sm font-medium text-white">
                            {hospital.category}
                          </div>
                          {hospital.matchedSpecialty && (
                            <div className="rounded-[4px] border border-brand-primary bg-white px-2 text-sm font-medium text-brand-primary">
                              {hospital.matchedSpecialty}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-start gap-x-1">
                          <Icon name="map-location" className="mt-[1px] h-4 w-4" />
                          <p className="line-clamp-1 text-xs font-medium text-gray-600 sm:text-sm">
                            {hospital.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Icon name="map-walking" className="h-4 w-4" />
                          <p className="text-xs font-medium text-gray-600 sm:text-sm">
                            약 {hospital.distanceMeters}m
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isSelected && hospital.homepageUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(hospital.homepageUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="mt-[10px] h-[39px] w-full rounded-[4px] bg-brand-primary text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    >
                      홈페이지
                    </button>
                  )}
                </div>
              );
            })
          )}
          <div className="h-6 shrink-0" />
        </div>
      </article>
    </section>
  );
};

export default HospitalMapSection;
