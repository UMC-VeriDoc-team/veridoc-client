import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import KakaoHospitalMap from "./KakaoHospitalMap";
import type { HospitalMapItem, LatLng } from "@/libs/kakaoMap";
import GetNearbyHospital from "@/services/home/GetNearbyHospital";

type UserLocation = LatLng & { accuracy: number };

const DEFAULT_CENTER: LatLng = { lat: 37.5563, lng: 126.9236 };

const SkeletonHospitalCard = () => {
  return (
    <div className="flex gap-x-4 rounded-[10px] border border-[#E9E9E9] px-4 py-[14px] shadow-[0_4px_20px_0_rgba(32,32,32,0.06)]">
      <div className="aspect-square min-w-[145px] animate-pulse rounded-[5px] bg-gray-100" />
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-y-3">
          <div className="h-5 w-[65%] animate-pulse rounded bg-gray-100" />
          <div className="flex gap-x-2">
            <div className="h-5 w-14 animate-pulse rounded bg-gray-100" />
            <div className="h-5 w-20 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="h-4 w-[90%] animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-[55%] animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

const HospitalMapSection = () => {
  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const [hospitals, setHospitals] = useState<HospitalMapItem[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);

  const [locationError, setLocationError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const debounceRef = useRef<number | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // 위치 갱신
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("이 브라우저에서는 위치 기능을 사용할 수 없어요.");
      return;
    }

    let cancelled = false;

    const applyPos = (pos: GeolocationPosition) => {
      if (cancelled) return;

      const nextCenter: LatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      const nextUser: UserLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: Number.isFinite(pos.coords.accuracy) ? pos.coords.accuracy : 0,
      };

      setCenter(nextCenter);
      setUserLocation(nextUser);
      setLocationError("");
    };

    const applyErr = (err: GeolocationPositionError) => {
      if (cancelled) return;

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
    };

    navigator.geolocation.getCurrentPosition(applyPos, applyErr, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10_000,
    });

    watchIdRef.current = navigator.geolocation.watchPosition(applyPos, applyErr, {
      enableHighAccuracy: true,
      maximumAge: 5_000,
      timeout: 10_000,
    });

    return () => {
      cancelled = true;
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  // 병원 조회
  useEffect(() => {
    if (!userLocation) return;

    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      void (async () => {
        setIsLoading(true);
        try {
          const res = await GetNearbyHospital({
            lat: userLocation.lat,
            lng: userLocation.lng,
            painAreaId: 1,
            limit: 3,
          });

          const list = res.hospitals ?? [];
          setHospitals(list);

          setSelectedHospitalId((prev) => {
            if (prev && list.some((h) => h.hospitalId === prev)) return prev;
            return list[0]?.hospitalId ?? null;
          });
        } catch (e) {
          console.error("GetNearbyHospital failed:", e);
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
    <section className="flex w-full flex-col border border-[#17171940] md:h-[630px] md:flex-row">
      <article className="order-1 h-[320px] w-full md:order-2 md:h-full md:flex-1">
        <KakaoHospitalMap
          center={center}
          hospitals={hospitals}
          selectedHospitalId={effectiveSelectedId}
          onSelectHospital={setSelectedHospitalId}
        />
      </article>

      <article className="order-2 w-full border-t border-[#17171940] p-4 md:order-1 md:h-full md:w-[40%] md:border-r md:border-t-0">
        {locationError && (
          <div className="mb-3 rounded-md bg-gray-50 p-3 text-xs text-red-600">{locationError}</div>
        )}

        <p className="p-[10px] text-base font-medium text-gray-950">
          <span className="font-semibold text-brand-primary">{hospitals.length}</span> 개 병원
        </p>

        <div className="flex max-h-[320px] flex-col gap-y-[10px] overflow-y-auto md:h-full md:max-h-none">
          {isLoading ? (
            <>
              <SkeletonHospitalCard />
              <SkeletonHospitalCard />
              <SkeletonHospitalCard />
            </>
          ) : (
            hospitals.map((hospital) => {
              const isSelected = effectiveSelectedId === hospital.hospitalId;
              const homepageUrl = hospital.homepageUrl;

              return (
                <div
                  key={hospital.hospitalId}
                  onClick={() => setSelectedHospitalId(hospital.hospitalId)}
                  className="cursor-pointer rounded-[10px] border border-[#E9E9E9] px-4 py-[14px] shadow-[0_4px_20px_0_rgba(32,32,32,0.06)] hover:bg-gray-50/80"
                >
                  <div className="flex gap-x-4">
                    {hospital.imageUrl ? (
                      <img
                        src={hospital.imageUrl}
                        alt={hospital.name}
                        className="aspect-square min-w-[145px] rounded-[5px] object-cover"
                      />
                    ) : (
                      <div className="aspect-square min-w-[145px] rounded-[5px] bg-gray-100" />
                    )}

                    <div className="flex w-full flex-col justify-between">
                      <div className="flex flex-col gap-y-2">
                        <p className="text-lg font-semibold text-gray-950">{hospital.name}</p>
                        <div className="flex flex-wrap gap-x-[5px] gap-y-1">
                          <div className="rounded-[4px] bg-brand-primary px-2 text-sm font-medium text-white">
                            {hospital.category}
                          </div>
                          {hospital.matchedSpecialty ? (
                            <div className="rounded-[4px] border border-brand-primary bg-white px-2 text-sm font-medium text-brand-primary">
                              {hospital.matchedSpecialty}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-start gap-x-1">
                          <Icon name="map-location" className="mt-[1px] h-4 w-4" />
                          <p className="text-sm font-medium text-gray-600">{hospital.address}</p>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Icon name="map-walking" className="h-4 w-4" />
                          <p className="text-sm font-medium text-gray-600">
                            약 {hospital.distanceMeters}m
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!homepageUrl) return;
                        window.open(homepageUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="mt-[10px] h-[39px] w-full rounded-[4px] bg-brand-primary text-sm font-semibold text-white hover:opacity-90"
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
