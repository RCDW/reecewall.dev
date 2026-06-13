import { Pill, SectionHeading } from "@reecewall/ui";
import { cv } from "../data/cv";

export default function CV() {
  return (
    <article className="pt-14">
      <header className="flex items-start justify-between gap-4 border-b border-ink pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold">{cv.name}</h1>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[2.2px] text-accent">
            {cv.tagline}
          </p>
          <p className="mt-2 text-[12px] text-muted">
            {cv.location} · {cv.email} ·{" "}
            {cv.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <a
                  className="text-muted underline-offset-2 hover:text-accent"
                  href={l.href}
                >
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>
        {/* Serves the existing designed PDF placed in /public */}
        <a
          href="/Reece_Wall_CV_Engineer.pdf"
          className="shrink-0 rounded-lg bg-accent px-3.5 py-2 text-[12.5px] font-medium text-paper hover:bg-accent-deep"
        >
          Download PDF
        </a>
      </header>

      <section className="mt-7">
        <SectionHeading>Profile</SectionHeading>
        <p className="text-[14px] leading-relaxed text-prose">{cv.profile}</p>
      </section>

      <section className="mt-7">
        <SectionHeading>Experience</SectionHeading>
        {cv.roles.map((r) => (
          <div key={r.title + r.start} className="mb-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold">
                {r.title}{" "}
                <span className="text-[13px] font-medium text-accent">
                  · {r.org}
                </span>
              </h3>
              <span className="whitespace-nowrap text-[11px] text-soft">
                {r.start} – {r.end}
              </span>
            </div>
            {r.stack && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {r.stack.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            )}
            <ul className="mt-2 space-y-1.5">
              {r.bullets.map((b, i) => (
                <li
                  key={i}
                  className="relative pl-3.5 text-[13.5px] leading-relaxed text-prose-strong"
                >
                  <span className="absolute left-0 top-2.5 h-0.5 w-1.5 rounded bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-7 grid gap-7 sm:grid-cols-2">
        <div>
          <SectionHeading>Skills</SectionHeading>
          {cv.skills.map((s) => (
            <div key={s.group} className="mb-3">
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[1.3px] text-soft">
                {s.group}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <Pill key={i}>{i}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <SectionHeading>Education</SectionHeading>
          {cv.education.map((e) => (
            <div key={e.award} className="mb-3">
              <p className="text-[14px] font-semibold leading-snug">
                {e.award}
              </p>
              <p className="text-[12px] text-muted">{e.place}</p>
              <p className="text-[11px] text-soft">{e.year}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
