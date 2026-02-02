export interface LatLng {
  lat: number;
  lng: number;
}

export interface HospitalMapItem {
  hospitalId: number;
  name: string;
  coordinate: LatLng;
  thumbnailUrl?: string | null;
  category: string;
  address: string;
  distanceMeters: number;
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

export interface KakaoCircle {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (latlng: KakaoLatLng) => void;
  setRadius: (radius: number) => void;
}

export type KakaoCircleCtor = new (options: {
  center: KakaoLatLng;
  radius: number;
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: string;
  fillColor?: string;
  fillOpacity?: number;
}) => KakaoCircle;

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

  Circle: new (options: {
    center: KakaoLatLng;
    radius: number;
    strokeWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeStyle?: string;
    fillColor?: string;
    fillOpacity?: number;
  }) => KakaoCircle;
}

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}
