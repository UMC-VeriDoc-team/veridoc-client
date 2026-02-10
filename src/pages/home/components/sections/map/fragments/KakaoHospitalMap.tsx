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

  // 오버레이 생성/갱신 (hospitals가 바뀔 때만)
  useEffect(() => {
    const map = mapRef.current;
    const maps = window.kakao?.maps;
    if (!isMapReady || !map || !maps) return;

    // 이전 오버레이 정리
    overlaysRef.current.forEach((item) => item.cleanup());
    overlaysRef.current.clear();

    hospitals.forEach((h) => {
      const position = new maps.LatLng(h.coordinate.lat, h.coordinate.lng);

      const container = document.createElement("div");
      container.style.width = "44px";
      container.style.height = "56px";
      container.style.cursor = "pointer";

      const reactRoot = createRoot(container);
      reactRoot.render(
        <HospitalMarker
          active={h.hospitalId === selectedHospitalId} // 초기 한번만
          imageUrl={h.imageUrl ?? null}
        />
      );

      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        onSelectHospitalRef.current(h.hospitalId);
      };
      container.addEventListener("click", handleClick);

      const overlay = new maps.CustomOverlay({
        position,
        content: container,
        xAnchor: 0.5,
        yAnchor: 1,
        clickable: true,
      });

      overlay.setMap(map);

      const cleanup = () => {
        try {
          container.removeEventListener("click", handleClick);
        } catch (err) {
          void err;
        }

        try {
          overlay.setMap(null);
        } catch (err) {
          void err;
        }

        // React가 렌더링 중일 때 unmount는 다음 tick으로
        queueMicrotask(() => {
          try {
            reactRoot.unmount();
          } catch (err) {
            void err;
          }
        });
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
      overlaysRef.current.clear();
    };
  }, [isMapReady, hospitals, onSelectHospital]);

  // 선택된 병원 이동 + active 상태 갱신
  useEffect(() => {
    const map = mapRef.current;
    const maps = window.kakao?.maps;
    if (!isMapReady || !map || !maps) return;
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
