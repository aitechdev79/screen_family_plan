import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PlanCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PlanCard({ title, children, className }: PlanCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm",
        className
      )}
    >
      <h2 className="mb-3 text-lg font-semibold text-neutral-900">{title}</h2>
      <div className="space-y-3 text-sm text-neutral-700">{children}</div>
    </section>
  );
}
