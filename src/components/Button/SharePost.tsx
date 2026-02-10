import Icon from "@/components/Icon/Icon";
import useSharePost, { type SharePlatform, type SharePayload } from "@/hooks/useSharePost";
import { useMemo } from "react";

interface ShareItem {
  iconName: string;
  platform: SharePlatform;
}

const shares: ShareItem[] = [
  { iconName: "facebook-fill", platform: "facebook" },
  { iconName: "kakao-fill", platform: "kakao" },
  { iconName: "instagram-fill", platform: "instagram" },
];

type SharePostProps = {
  title?: string;
  subtitle?: string;
};

const SharePost = ({ title, subtitle }: SharePostProps) => {
  const { shareFacebook, shareKakao, shareInstagram, shareNative, copyLink } = useSharePost();

  const sharePayload: SharePayload = useMemo(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    return {
      title: title ?? "VeriDoc",
      text: subtitle ?? title ?? "VeriDoc",
      url,
    };
  }, [title, subtitle]);

  const handleShare = async (platform: SharePlatform) => {
    // 네이티브 공유가 되면 우선 사용
    const shared = await shareNative(sharePayload);
    if (shared) return;

    if (platform === "facebook") {
      shareFacebook(sharePayload.url);
      return;
    }

    if (platform === "kakao") {
      const ok = await shareKakao(sharePayload);
      if (!ok) await copyLink(sharePayload.url);
      return;
    }

    // instagram
    const ok = await shareInstagram(sharePayload);
    if (!ok) await copyLink(sharePayload.url);
  };

  return (
    <div className="flex gap-2">
      {shares.map((item) => (
        <button
          key={item.iconName}
          type="button"
          onClick={() => void handleShare(item.platform)}
          aria-label={`share-${item.platform}`}
        >
          <Icon name={item.iconName} className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      ))}
    </div>
  );
};

export default SharePost;
