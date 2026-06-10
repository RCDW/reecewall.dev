import { Pill, StatusBadge } from "@reecewall/ui";
import { cv, projects } from "../data/cv";

export default function Home() {
  return (
    <div className="pt-14">
      <header className="rise">
        <h1 className="font-serif text-4xl font-semibold leading-tight">
          Reece Wall
        </h1>
        <p className="mt-2 text-[12px] font-semibold uppercase tracking-[2.4px] text-accent">
          {cv.tagline}
        </p>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#3a3631]">
          I build reliable data pipelines and the interfaces that make them
          legible — from Azure and Databricks at work to live, queryable
          projects of my own.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="mb-4 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[2px] text-accent">
          Selected work <span className="h-px flex-1 bg-hair" />
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <a
              key={p.slug}
              href={p.href}
              className="rise group rounded-xl border border-hair bg-white p-5 transition hover:border-accent"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg font-semibold group-hover:text-accent">
                  {p.title}
                </h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {p.blurb}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
