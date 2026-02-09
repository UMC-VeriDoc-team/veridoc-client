import { useCallback } from "react";

export type SharePlatform = "facebook" | "kakao" | "instagram";

export type SharePayload = {
  title: string;
  text?: string;
  url: string;
};

type UseSharePostReturn = {
  shareNative: (payload: SharePayload) => Promise<boolean>;

  shareFacebook: (url: string) => boolean;
  shareKakao: (payload: SharePayload) => Promise<boolean>;
  shareInstagram: (payload: SharePayload) => Promise<boolean>;

  // 링크 복사
  copyLink: (url: string) => Promise<boolean>;
};

const useSharePost = (): UseSharePostReturn => {
  const copyLink = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        return ok;
      } catch {
        return false;
      }
    }
  }, []);

  const shareNative = useCallback(async (payload: SharePayload) => {
    const nav = navigator as Navigator & {
      share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
      canShare?: (data: { url?: string; text?: string; title?: string }) => boolean;
    };

    if (!nav.share) return false;

    try {
      if (
        nav.canShare &&
        !nav.canShare({ url: payload.url, text: payload.text, title: payload.title })
      )
        return false;

      await nav.share({ title: payload.title, text: payload.text, url: payload.url });
      return true;
    } catch {
      return false;
    }
  }, []);

  const shareFacebook = useCallback((url: string) => {
    try {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      return true;
    } catch {
      return false;
    }
  }, []);

  // 카카오톡 공유
  const shareKakao = useCallback(async () => {
    const w = window as Window & { Kakao?: unknown };
    if (!w.Kakao) return false;

    return false;
  }, []);

  // 인스타그램 공유
  const shareInstagram = useCallback(async () => {
    return false;
  }, []);

  return {
    shareNative,
    shareFacebook,
    shareKakao,
    shareInstagram,
    copyLink,
  };
};

export default useSharePost;
