export interface LatLng {
  lat: number;
  lng: number;
}

export interface HospitalMapItem {
  hospitalId: number;
  name: string;
  coordinate: LatLng;
  thumbnailUrl?: string | null;
}

export interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

export interface KakaoMap {
  panTo: (latlng: KakaoLatLng) => void;
  setLevel: (level: number) => void;
  getLevel: () => number;
}

export interface KakaoCustomOverlay {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (latlng: KakaoLatLng) => void;
}

export interface KakaoMaps {
  load: (cb: () => void) => void;

  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;

  LatLng: new (lat: number, lng: number) => KakaoLatLng;

  CustomOverlay: new (options: {
    position: KakaoLatLng;
    content: HTMLElement;
    xAnchor?: number;
    yAnchor?: number;
    clickable?: boolean;
  }) => KakaoCustomOverlay;
}

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}
