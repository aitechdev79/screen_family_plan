"use client";

import { useEffect, useState } from "react";
import { GeneratedPlan } from "@/lib/plan-engine/types";
import { ResultView } from "./result-view";

const STORAGE_KEY = "media-plan-result";

interface ResultClientProps {
  fallbackPlan: GeneratedPlan;
}

export function ResultClient({ fallbackPlan }: ResultClientProps) {
  const [plan, setPlan] = useState<GeneratedPlan>(fallbackPlan);

  useEffect(() => {
    const storedPlan = window.sessionStorage.getItem(STORAGE_KEY);

    if (!storedPlan) {
      return;
    }

    try {
      setPlan(JSON.parse(storedPlan) as GeneratedPlan);
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return <ResultView plan={plan} />;
}
