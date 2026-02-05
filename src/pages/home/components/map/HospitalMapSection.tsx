import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import KakaoHospitalMap from "./KakaoHospitalMap";
import type { HospitalMapItem, LatLng } from "@/libs/kakaoMap";
import GetNearbyHospital from "@/services/home/GetNearbyHospital";

type UserLocation = LatLng & { accuracy: number };

const DEFAULT_CENTER: LatLng = { lat: 37.5563, lng: 126.9236 };

const HospitalMapSection = () => {
  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const [hospitals, setHospitals] = useState<HospitalMapItem[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);

  const debounceRef = useRef<number | null>(null);

  /* 위치 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const next = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setCenter(next);
      setUserLocation({ ...next, accuracy: pos.coords.accuracy });
    });
  }, []);

  /* 병원 조회 */
  useEffect(() => {
    if (!userLocation) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(async () => {
      try {
        const res = await GetNearbyHospital({
          lat: userLocation.lat,
          lng: userLocation.lng,
          painAreaId: 1,
          limit: 3,
        });
        setHospitals(res.hospitals ?? []);
        setSelectedHospitalId(null); // 기본: 아무것도 선택 안 됨
      } finally {
      }
    }, 500);
  }, [userLocation?.lat, userLocation?.lng]);

  return (
    <section className="flex w-full flex-col border border-[#17171940] md:h-[670px] md:flex-row">
      {/* 지도 */}
      <article className="order-1 h-[320px] w-full md:order-2 md:h-full md:flex-1">
        <KakaoHospitalMap
          center={center}
          hospitals={hospitals}
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={setSelectedHospitalId}
        />
      </article>

      {/* 리스트 */}
      <article className="order-2 w-full border-t border-[#17171940] p-4 md:order-1 md:w-[40%] md:border-r md:border-t-0">
        <p className="p-[10px] text-base font-medium text-gray-950">
          <span className="font-semibold text-brand-primary">{hospitals.length}</span> 개 병원
        </p>

        <div className="flex max-h-[320px] flex-col gap-y-[10px] overflow-y-auto md:max-h-none">
          {hospitals.map((hospital) => {
            const isSelected = selectedHospitalId === hospital.hospitalId;
            const homepageUrl = hospital.homepageUrl;

            return (
              <div
                key={hospital.hospitalId}
                onClick={() => setSelectedHospitalId(hospital.hospitalId)}
                className={[
                  "rounded-[10px] border px-[17px] py-[13px] shadow-[0_4px_20px_0_rgba(32,32,32,0.06)]",
                  isSelected
                    ? "border-brand-primary ring-1 ring-brand-primary"
                    : "border-[#E9E9E9]",
                ].join(" ")}
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

                  <div className="flex w-full flex-col">
                    <p className="text-lg font-semibold text-gray-950">{hospital.name}</p>

                    <div className="mt-5 flex gap-x-1">
                      <span className="rounded-[4px] bg-brand-primary px-2 text-sm font-medium text-white">
                        {hospital.category}
                      </span>
                      {hospital.matchedSpecialty && (
                        <span className="rounded-[4px] border border-brand-primary px-2 text-sm font-medium text-brand-primary">
                          {hospital.matchedSpecialty}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-start gap-x-1">
                      <Icon name="map-location" className="h-4 w-4" />
                      <p className="text-sm text-gray-600">{hospital.address}</p>
                    </div>

                    <div className="mt-1 flex items-center gap-x-1">
                      <Icon name="map-walking" className="h-4 w-4" />
                      <p className="text-sm text-gray-600">약 {hospital.distanceMeters}m</p>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("homepageUrl =", homepageUrl);
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
          })}

          {/* 리스트 하단 여백 */}
          <div className="h-6 shrink-0" />
        </div>
      </article>
    </section>
  );
};

export default HospitalMapSection;
