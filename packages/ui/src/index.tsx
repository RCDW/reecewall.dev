import type { ReactNode } from "react";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-pill-bg px-2.5 py-0.5 text-[12px] font-medium text-pill-ink">
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-hair bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

const STATUS: Record<string, { label: string; cls: string }> = {
  live: { label: "live", cls: "bg-live-bg text-live-ink" },
  "in-dev": { label: "in development", cls: "bg-card text-muted" },
  origin: { label: "origin · 2025", cls: "bg-origin-bg text-warn" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? STATUS["in-dev"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${s.cls}`}
    >
      {status === "live" && (
        <span className="h-1.5 w-1.5 rounded-full bg-live-dot" />
      )}
      {s.label}
    </span>
  );
}

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 font-serif text-lg font-semibold leading-none text-accent">
        {value}
      </span>
      <span className="text-[12px] leading-snug text-muted">{label}</span>
    </div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[2px] text-accent">
      {children}
      <span className="h-px flex-1 bg-hair" />
    </h2>
  );
}
