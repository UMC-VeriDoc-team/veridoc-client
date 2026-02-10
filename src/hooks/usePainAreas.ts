import { useState, useEffect, useMemo } from "react";
import { SYMPTOMS } from "@/constants/symptoms";
import getPainAreas, { type PainArea } from "@/pages/signup/services/getPainAreas";

export const UNSELECTED_PAIN_AREA_ID = 8;

export const usePainAreas = () => {
  const [painAreas, setPainAreas] = useState<PainArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await getPainAreas();
        setPainAreas(res?.data?.painAreas ?? []);
      } catch (err) {
        console.error("Failed to fetch pain areas", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  // Key(영문) -> ID(서버번호) 매칭 맵
  const painAreaIdByKey = useMemo(() => {
    const mapByName = new Map(painAreas.map((p) => [p.name, p.painAreaID]));
    const mapByKey = new Map<string, number>();

    for (const s of SYMPTOMS) {
      const id = mapByName.get(s.label);
      if (id != null) mapByKey.set(s.key, id);
    }
    return mapByKey;
  }, [painAreas]);

  // ID(서버번호) -> Key(영문) 역매칭 맵
  const keyByPainAreaId = useMemo(() => {
    const map = new Map<number, string>();
    painAreas.forEach((p) => {
      const matched = SYMPTOMS.find((s) => s.label === p.name);
      if (matched) map.set(p.painAreaID, matched.key);
    });
    return map;
  }, [painAreas]);

  return {
    painAreas,
    painAreaIdByKey,
    keyByPainAreaId,
    loading,
  };
};
