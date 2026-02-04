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
  onClick: (e: MouseEvent) => void;
}

const KakaoHospitalMap = ({
  center,
  hospitals,
  selectedHospitalId,
  onSelectHospital,
}: KakaoHospitalMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMap | null>(null);
  const mapsRef = useRef<KakaoMaps | null>(null);
  const overlaysRef = useRef<Map<string, OverlayItem>>(new Map());
  const [isMapReady, setIsMapReady] = useState(false);

  // 최초 지도 생성
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const maps = window.kakao?.maps;
      if (!maps) return;

      mapsRef.current = maps;

      const map = new maps.Map(mapContainerRef.current as HTMLElement, {
        center: new maps.LatLng(center.lat, center.lng),
        level: 4,
      });

      mapRef.current = map;
      setIsMapReady(true);

      const handleResize = () => {
        window.setTimeout(() => {
          mapRef.current?.relayout?.();
        }, 0);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
      };
    });
  }, []);

  useEffect(() => {
    if (!isMapReady) return;
    const map = mapRef.current;
    const maps = mapsRef.current;
    if (!map || !maps) return;

    const pos = new maps.LatLng(center.lat, center.lng);
    map.panTo(pos);
  }, [isMapReady, center.lat, center.lng]);

  useEffect(() => {
    if (!isMapReady) return;
    const map = mapRef.current;
    const maps = mapsRef.current;
    if (!map || !maps) return;

    const prev = overlaysRef.current;
    const next = new Map<string, OverlayItem>();

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

      const onClick = (e: MouseEvent) => {
        e.preventDefault();
        onSelectHospital(h.hospitalId);
      };
      container.addEventListener("click", onClick);

      const overlay = new maps.CustomOverlay({
        position,
        content: container,
        xAnchor: 0.5,
        yAnchor: 1,
        clickable: true,
      });

      overlay.setMap(map);

      next.set(h.hospitalId, {
        hospitalId: h.hospitalId,
        position,
        overlay,
        container,
        reactRoot,
        onClick,
      });
    });

    overlaysRef.current = next;

    return () => {
      prev.forEach((item) => {
        item.container.removeEventListener("click", item.onClick);
        item.overlay.setMap(null);
        try {
          item.reactRoot.unmount();
        } catch {
          // ignore
        }
      });
      prev.clear();
    };
  }, [isMapReady, hospitals, onSelectHospital]);

  useEffect(() => {
    if (!isMapReady) return;
    const map = mapRef.current;
    if (!map) return;
    if (selectedHospitalId == null) return;

    const selected = overlaysRef.current.get(selectedHospitalId);
    if (selected) map.panTo(selected.position);

    overlaysRef.current.forEach((item, id) => {
      const hospital = hospitals.find((h) => h.hospitalId === id);
      item.reactRoot.render(
        <HospitalMarker active={id === selectedHospitalId} imageUrl={hospital?.imageUrl ?? null} />
      );
    });
  }, [isMapReady, selectedHospitalId, hospitals]);

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
