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
import HospitalMarker from "@/pages/home/components/sections/map/fragments/HospitalMarker";

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
  cleanup: () => void;
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
  const onSelectHospitalRef = useRef(onSelectHospital);
  const [isMapReady, setIsMapReady] = useState(false);

  // 컴포넌트 언마운트/스플래시 전환 중 콜백 방지용
  const aliveRef = useRef(true);

  useEffect(() => {
    onSelectHospitalRef.current = onSelectHospital;
  }, [onSelectHospital]);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  // 지도 초기화 1회
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!window.kakao?.maps) return;

    let rafId = 0;

    const init = () => {
      if (!aliveRef.current) return;

      const container = mapContainerRef.current;
      const maps = window.kakao?.maps;

      // 컨테이너가 사라졌거나 연결이 끊겼으면 중단
      if (!container || !container.isConnected) return;
      if (!maps) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // 다음 프레임에 재시도
        rafId = requestAnimationFrame(init);
        return;
      }

      maps.load(() => {
        if (!aliveRef.current) return;

        const c = mapContainerRef.current;
        if (!c || !c.isConnected) return;

        const r = c.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;

        const kakaoMaps: KakaoMaps = window.kakao!.maps;

        // 이미 만들어졌으면 다시 만들지 않기
        if (mapRef.current) return;

        const map = new kakaoMaps.Map(c, {
          center: new kakaoMaps.LatLng(center.lat, center.lng),
          level: 4,
        });

        mapRef.current = map;
        setIsMapReady(true);
      });
    };

    rafId = requestAnimationFrame(init);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // center 바뀌면 map panTo만
  useEffect(() => {
    const map = mapRef.current;
    const maps = window.kakao?.maps;
    if (!isMapReady || !map || !maps) return;

    const pos = new maps.LatLng(center.lat, center.lng);
    map.panTo(pos);
  }, [isMapReady, center.lat, center.lng]);

  // 오버레이 생성/갱신
  useEffect(() => {
    const map = mapRef.current;
    const maps = window.kakao?.maps;
    if (!isMapReady || !map || !maps) return;

    // 이전 오버레이 정리
    overlaysRef.current.forEach((item) => item.cleanup());
    overlaysRef.current.clear();

    hospitals.forEach((h, idx) => {
      // 동일하거나 인접한 좌표에 마커가 몰려 겹쳐보이는 현상을 막기 위해 나선형으로 미세하게 분산 시킴
      const angle = idx * 0.5; // 마커가 회전하며 퍼지는 각도
      const radius = 0.00002 * idx; // 중심점에서 멀어지는 거리

      const latJitter = Math.cos(angle) * radius;
      const lngJitter = Math.sin(angle) * radius;

      const position = new maps.LatLng(h.coordinate.lat + latJitter, h.coordinate.lng + lngJitter);

      // 마커를 담을 컨테이너 생성 및 스타일 설정
      const container = document.createElement("div");
      container.style.width = "64px";
      container.style.height = "80px";
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
      container.style.cursor = "pointer";

      const isSelected = h.hospitalId === selectedHospitalId;

      container.style.zIndex = isSelected ? "999" : `${10 + idx}`;
      container.style.position = "relative";

      // 클릭 핸들러
      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // 지도 클릭 이벤트가 발생하는 것 방지
        onSelectHospitalRef.current(h.hospitalId);
      };

      container.addEventListener("click", handleClick);

      const reactRoot = createRoot(container);
      reactRoot.render(<HospitalMarker active={isSelected} />);

      // 카카오 커스텀 오버레이 생성
      const overlay = new maps.CustomOverlay({
        position,
        content: container,
        xAnchor: 0.5,
        yAnchor: 1,
        zIndex: isSelected ? 999 : 10 + idx,
      });

      overlay.setMap(map);

      const cleanup = () => {
        container.removeEventListener("click", handleClick);
        overlay.setMap(null);
        try {
          reactRoot.unmount();
        } catch (err) {
          console.error("Unmount error:", err);
        }
      };

      overlaysRef.current.set(h.hospitalId, {
        hospitalId: h.hospitalId,
        position,
        overlay,
        container,
        reactRoot,
        cleanup,
      });
    });

    return () => {
      overlaysRef.current.forEach((item) => item.cleanup());
    };
  }, [isMapReady, hospitals]);

  // 선택된 병원 이동 + active 상태 갱신
  useEffect(() => {
    const map = mapRef.current;
    if (!isMapReady || !map) return;

    const hospitalIndexMap = new Map(hospitals.map((h, i) => [h.hospitalId, i]));

    overlaysRef.current.forEach((item, id) => {
      const isSelected = id === selectedHospitalId;
      const baseIndex = hospitalIndexMap.get(id) ?? 0;
      item.overlay.setZIndex(isSelected ? 100 : baseIndex);

      item.reactRoot.render(<HospitalMarker active={isSelected} />);
    });

    if (selectedHospitalId) {
      const selected = overlaysRef.current.get(selectedHospitalId);
      if (selected) map.panTo(selected.position);
    }
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
    <div className="relative h-full w-full overflow-hidden bg-gray-100">
      <div ref={mapContainerRef} className="h-full w-full" />

      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center overflow-hidden rounded-[4px] bg-white shadow-lg">
        <button
          type="button"
          onClick={handleZoomIn}
          className="flex h-10 w-10 items-center justify-center bg-white active:brightness-50"
        >
          <Icon name="zoom-in" className="h-5 w-5" />
        </button>
        <div className="h-px w-[70%] bg-[#E6E6E6]" />
        <button
          type="button"
          onClick={handleZoomOut}
          className="flex h-10 w-10 items-center justify-center bg-white active:brightness-50"
        >
          <Icon name="zoom-out" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default KakaoHospitalMap;
