export interface LatLng {
  lat: number;
  lng: number;
}

export interface HospitalMapItem {
  hospitalId: string;
  name: string;
  coordinate: LatLng;
  imageUrl: string | undefined;
  category: string;
  address: string;
  distanceMeters: number;
  matchedSpecialty: string;
  homepageUrl: string;
}

export interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

export interface KakaoMap {
  panTo: (latlng: KakaoLatLng) => void;
  setLevel: (level: number) => void;
  getLevel: () => number;
  relayout?: () => void;
  setCenter?: (latlng: KakaoLatLng) => void;
}

export interface KakaoCustomOverlay {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (latlng: KakaoLatLng) => void;
  setZIndex: (zIndex: number) => void;
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
    zIndex?: number;
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

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      maps: KakaoMaps;
      Share: {
        sendDefault: (options: unknown) => void;
      };
    };
  }
}
