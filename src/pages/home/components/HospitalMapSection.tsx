import Icon from "@/components/Icon/Icon";
import { HOSPITALS_MOCK } from "@/constants/mock/home/hospital";
import KakaoHospitalMap from "./KakaoHospitalMap";
import { useEffect, useState } from "react";

const data = HOSPITALS_MOCK;

const HospitalMapSection = () => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(
    data.hospitals[0]?.hospitalId ?? null
  );

  // hospitals가 바뀔 경우 대비 (나중에 API 연동 시 유용)
  useEffect(() => {
    if (data.hospitals.length > 0) {
      setSelectedHospitalId(data.hospitals[0].hospitalId);
    }
  }, []);

  return (
    <section className="flex w-full border border-[#17171940]">
      {/* 왼쪽: 병원 목록 3개 */}
      <article className="w-[40%] border-r border-[#17171940] p-4">
        {/* 병원 수 */}
        <p className="p-[10px] text-base font-medium text-gray-950">
          <span className="font-semibold text-brand-primary">3</span> 개 병원
        </p>

        {/* 병원 목록 */}
        <div className="flex h-full flex-col gap-y-[10px]">
          {data.hospitals.map((hospital) => (
            <div
              key={hospital.hospitalId}
              className="flex gap-x-4 rounded-[10px] px-4 py-[14px] shadow-[0_4px_20px_0_rgba(32,32,32,0.06)]"
            >
              {/* 이미지 */}
              <div className="w-[145px] rounded-[5px] bg-gray-100"></div>
              <div className="flex flex-col gap-y-6">
                {/* 병원이름 / 뱃지 */}
                <div className="flex flex-col gap-y-2">
                  <p className="text-lg font-semibold text-gray-950">{hospital.name}</p>
                  {/* 뱃지 */}
                  <div className="flex gap-x-[5px]">
                    <div className="rounded-[4px] bg-brand-primary px-2 py-[1px] text-sm font-medium text-white">
                      복통
                    </div>
                    <div className="rounded-[4px] border border-brand-primary bg-white px-2 py-[1px] text-sm font-medium text-brand-primary">
                      {hospital.category}
                    </div>
                  </div>
                </div>
                {/* 주소 / 거리 */}
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

      {/* 지도 */}
      <article className="flex-1">
        <KakaoHospitalMap
          center={data.searchContext.center}
          hospitals={data.hospitals}
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={setSelectedHospitalId}
        />
      </article>
    </section>
  );
};

export default HospitalMapSection;
