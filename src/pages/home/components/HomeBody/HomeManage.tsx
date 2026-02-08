import { useEffect, useState } from "react";
import AlternativeCard from "./HomeAlternative/AlternativeCard";
import { getTemporaryGuideIds } from "../../services/getTemporaryGuideIds";
import { getTemporaryGuideDetail } from "@/components/Modal/services/getTemporaryDetail";

type CardModel = {
  guideId: number;
  title: string;
  badges: string[];
  description: string;
  imageUrl: string;
  type: string;
  duration: string;
};

const HomeManage = () => {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [painAreaName, setPainAreaName] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const idsRes = await getTemporaryGuideIds();
        const guides = idsRes.data.guides ?? [];
        const firstAreaName = guides[0]?.painAreaName ?? "";
        setPainAreaName(firstAreaName);

        const targetIds = guides
          .filter((g) => g.painAreaName === firstAreaName)
          .slice(0, 3)
          .map((g) => g.guideId);

        const detailResults = await Promise.all(
          targetIds.map(async (id) => {
            try {
              const res = await getTemporaryGuideDetail(id);
              return res.data;
            } catch {
              return null;
            }
          })
        );

        const nextCards: CardModel[] = detailResults
          .filter((d): d is NonNullable<typeof d> => !!d)
          .map((d) => ({
            guideId: d.guideId,
            title: d.title ?? "",
            badges: d.badges ?? [],
            description: d.subtitle ?? (d.content ? d.content.slice(0, 40) + "…" : ""),
            imageUrl: d.imageUrl ?? "",
            type: d.type ?? "",
            duration: d.duration ?? "",
          }));

        setCards(nextCards);
      } catch (e) {
        console.error("[HomeManage TemporaryGuides] error:", e);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) return <div className="text-sm text-gray-400">불러오는 중…</div>;

  return (
    <section className="flex w-full flex-col pl-[30px] text-left sm:px-0">
      <div className="flex flex-col">
        <span className="italic-normal text-xl font-bold leading-[140%] text-gray-950 sm:text-3xl">
          {painAreaName} 통증 임시 대처 방안
        </span>
        <div className="mt-[10px] flex items-center self-stretch">
          <span className="text-base font-semibold leading-[140%] text-gray-950 sm:text-xl">
            선택한 부위를 기준으로 임시 대처 방안을 확인하세요
          </span>
        </div>
      </div>
      <article className="mt-5 flex md:mt-[40px] md:overflow-x-hidden">
        <div className="flex flex-nowrap gap-x-5 overflow-x-scroll last:pr-[30px] md:grid md:grid-cols-3 md:gap-x-[30px] md:px-0">
          {cards.length === 0 ? (
            <div className="text-sm text-gray-400">임시 대처 가이드가 없습니다.</div>
          ) : (
            cards.map((c) => (
              <AlternativeCard
                key={c.guideId}
                guideId={c.guideId}
                title={c.title}
                badges={c.badges}
                description={c.description}
                imageUrl={c.imageUrl}
                type={c.type}
                duration={c.duration}
              />
            ))
          )}
        </div>
      </article>
    </section>
  );
};

export default HomeManage;
