import { useEffect, useState } from "react";

const KAKAO_SCRIPT_ID = import.meta.env.VITE_KAKAO_MAP_KEY;

interface UseKakaoMapLoaderOptions {
  appKey: string;
}

const useKakaoMapLoader = ({ appKey }: UseKakaoMapLoaderOptions) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao?.maps) {
      setLoaded(true);
      return;
    }

    const existing = document.getElementById(KAKAO_SCRIPT_ID);
    if (existing) {
      // 이미 로드 중인 경우
      const onLoad = () => setLoaded(true);
      existing.addEventListener("load", onLoad);
      return () => existing.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.id = KAKAO_SCRIPT_ID;
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}`;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {};
  }, [appKey]);

  return loaded;
};

export default useKakaoMapLoader;
