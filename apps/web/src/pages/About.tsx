import { cv } from "../data/cv";

export default function About() {
  return (
    <div className="pt-14">
      <h1 className="font-serif text-3xl font-semibold">About</h1>
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Photo lives here (About only — not on CV/PDF). Drop a file in /public. */}
        <img
          src="/reece.jpg"
          alt="Reece Wall"
          className="h-28 w-28 shrink-0 rounded-2xl border border-hair object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="max-w-xl text-[15px] leading-relaxed text-[#3a3631]">
          <p>
            I'm a data engineer in Nottingham, working across the Boots UK
            supply chain — pipelines, forecasting and replenishment systems at
            national scale. I like problems where many sites produce live
            readings against thresholds, and where small upstream changes
            propagate downstream.
          </p>
          <p className="mt-3">
            Before data I built for the web, which is why these projects are
            live and interactive rather than static write-ups. The aim is always
            to make the normally-invisible parts of a system legible.
          </p>
          <p className="mt-5 text-[13px] text-muted">
            {cv.email} ·{" "}
            {cv.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <a
                  className="underline-offset-2 hover:text-accent"
                  href={l.href}
                >
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
