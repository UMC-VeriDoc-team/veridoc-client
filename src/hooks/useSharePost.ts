// src/hooks/useSharePost.ts
import { useCallback } from "react";

export type SharePlatform = "facebook" | "kakao" | "instagram";

export type SharePayload = {
  title: string;
  text?: string;
  url: string;
};

type UseSharePostReturn = {
  // Web Share API (지원되면 네이티브 공유 시트)
  shareNative: (payload: SharePayload) => Promise<boolean>;

  // 플랫폼별 공유 (성공 여부)
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
      // clipboard 미지원/권한 거부 시 fallback
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
      // 일부 브라우저는 canShare 체크 필요
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

  /**
   * 카카오톡 공유
   * - 실제로는 Kakao SDK(카카오 JavaScript 키 + 스크립트 로드)가 있어야 “톡 공유”가 가능해.
   * - 지금은 SDK가 없으면 false 반환하고, 호출부에서 copyLink로 fallback 하도록 설계.
   */
  const shareKakao = useCallback(async (_payload: SharePayload) => {
    // window.Kakao가 있는 프로젝트면 여기서 SDK 호출로 확장하면 됨
    // 예: window.Kakao.Share.sendDefault(...)
    const w = window as Window & { Kakao?: unknown };
    if (!w.Kakao) return false;

    // TODO: Kakao SDK 연동 구현 시 true 반환
    return false;
  }, []);

  /**
   * 인스타그램은 “웹에서 곧장 특정 포스트 공유”가 제한적이라 보통 링크복사 fallback이 안전함.
   * - 모바일 앱 스킴 등을 쓰더라도 브라우저/OS 제약이 많아서 여기선 false 반환 기본.
   */
  const shareInstagram = useCallback(async (_payload: SharePayload) => {
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
