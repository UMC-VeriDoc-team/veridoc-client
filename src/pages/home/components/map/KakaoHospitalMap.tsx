import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import type {
  HospitalMapItem,
  KakaoCustomOverlay,
  KakaoLatLng,
  KakaoMap,
  KakaoMaps,
  LatLng,
} from "@/libs/kakaoMap";
import Icon from "@/components/Icon/Icon";
import HospitalMarker from "./HospitalMarker";

interface KakaoHospitalMapProps {
  center: LatLng;
  hospitals: HospitalMapItem[];
  selectedHospitalId: string | null;
  onSelectHospital: (id: string) => void;
}

interface OverlayItem {
  hospitalId: string;
  position: KakaoLatLng;
  overlay: KakaoCustomOverlay;
  container: HTMLDivElement;
  reactRoot: Root;
}

const KakaoHospitalMap = ({
  center,
  hospitals,
  selectedHospitalId,
  onSelectHospital,
}: KakaoHospitalMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMap | null>(null);
  const overlaysRef = useRef<Map<string, OverlayItem>>(new Map());
  const [isMapReady, setIsMapReady] = useState(false);

  // 지도 초기화
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      if (!window.kakao?.maps) return;

      const maps: KakaoMaps = window.kakao.maps;

      const map = new maps.Map(mapContainerRef.current as HTMLElement, {
        center: new maps.LatLng(center.lat, center.lng),
        level: 4,
      });

      mapRef.current = map;
      setIsMapReady(true);
    });
  }, [center.lat, center.lng]);

  // 오버레이 생성/갱신 (병원)
  useEffect(() => {
    const map = mapRef.current;
    const maps = window.kakao?.maps;
    if (!isMapReady || !map || !maps) return;

    // 기존 오버레이 정리
    overlaysRef.current.forEach((item) => {
      item.overlay.setMap(null);
      item.reactRoot.unmount();
    });
    overlaysRef.current.clear();

    // 새로 생성
    hospitals.forEach((h) => {
      const position = new maps.LatLng(h.coordinate.lat, h.coordinate.lng);

      const container = document.createElement("div");
      container.style.width = "44px";
      container.style.height = "56px";
      container.style.cursor = "pointer";

      const reactRoot = createRoot(container);
      reactRoot.render(
        <HospitalMarker
          active={h.hospitalId === selectedHospitalId}
          imageUrl={h.imageUrl ?? null}
        />
      );

      container.addEventListener("click", (e) => {
        e.preventDefault();
        onSelectHospital(h.hospitalId);
      });

      const overlay = new maps.CustomOverlay({
        position,
        content: container,
        xAnchor: 0.5,
        yAnchor: 1,
        clickable: true,
      });

      overlay.setMap(map);

      overlaysRef.current.set(h.hospitalId, {
        hospitalId: h.hospitalId,
        position,
        overlay,
        container,
        reactRoot,
      });
    });
  }, [isMapReady, hospitals, selectedHospitalId, onSelectHospital]);

  // 선택된 병원 panTo + 마커 active 갱신
  useEffect(() => {
    const map = mapRef.current;
    if (!isMapReady || !map) return;
    if (selectedHospitalId === null) return;

    const selected = overlaysRef.current.get(selectedHospitalId);
    if (!selected) return;

    map.panTo(selected.position);

    overlaysRef.current.forEach((item, id) => {
      const hospital = hospitals.find((h) => h.hospitalId === id);
      item.reactRoot.render(
        <HospitalMarker active={id === selectedHospitalId} imageUrl={hospital?.imageUrl ?? null} />
      );
    });
  }, [isMapReady, selectedHospitalId, hospitals]);

  // 줌 버튼
  const handleZoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(Math.max(map.getLevel() - 1, 1));
  };

  const handleZoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(Math.min(map.getLevel() + 1, 12));
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
      <div ref={mapContainerRef} className="h-full w-full" />

      {/* 줌 컨트롤 */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center overflow-hidden rounded-[4px] bg-white shadow-lg">
        <button
          type="button"
          onClick={handleZoomIn}
          className="flex h-10 w-10 items-center justify-center bg-white"
        >
          <Icon name="zoom-in" className="h-5 w-5" />
        </button>
        <div className="h-px w-[70%] bg-[#E6E6E6]" />
        <button
          type="button"
          onClick={handleZoomOut}
          className="flex h-10 w-10 items-center justify-center bg-white"
        >
          <Icon name="zoom-out" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default KakaoHospitalMap;
