import { useEffect, useState } from "react";

const KAKAO_SCRIPT_ID = import.meta.env.VITE_KAKAO_MAP_KEY;

interface UseKakaoMapLoaderOptions {
  appKey: string;
}

const useKakaoMapLoader = ({ appKey }: UseKakaoMapLoaderOptions) => {
  const [loaded, setLoaded] = useState<boolean>(() => Boolean(window.kakao?.maps));

  useEffect(() => {
    if (loaded) return;

    const existing = document.getElementById(KAKAO_SCRIPT_ID) as HTMLScriptElement | null;

    if (existing) {
      const onLoad = () => setLoaded(true);
      existing.addEventListener("load", onLoad);
      return () => existing.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.id = KAKAO_SCRIPT_ID;
    script.async = false;
    script.defer = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;

    const onLoad = () => setLoaded(true);
    script.addEventListener("load", onLoad);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoad);
    };
  }, [appKey, loaded]);

  return loaded;
};

export default useKakaoMapLoader;
