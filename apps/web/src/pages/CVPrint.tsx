import { useSearchParams } from "react-router-dom";
import { cv } from "../data/cv";
import "../cv-print.css";

// Designed A4 rendering of the master CV, used only by scripts/generate-cv-pdf.ts
// (Playwright loads it and prints to PDF). Rendered bare in App.tsx — no nav/shell.
// The phone number lives in CI secrets, not in source: it's passed in via the
// ?phone= search param at generation time, so visiting /cv/print without it
// (e.g. on the live site) simply omits the phone row — nothing leaks.

function stripProtocol(href: string) {
  return href.replace(/^https?:\/\//, "");
}

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const LinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function linkIcon(label: string) {
  if (label === "LinkedIn") return <LinkedInIcon />;
  return <LinkIcon />;
}

export default function CVPrint() {
  const [params] = useSearchParams();
  const phone = params.get("phone");

  return (
    <div className="cv-page">
      <header className="cv-header">
        <div>
          <div className="cv-name">{cv.name}</div>
          <div className="cv-tagline">{cv.tagline}</div>
        </div>
        <div className="cv-contact">
          {phone && (
            <div className="cv-row">
              <PhoneIcon />
              <span>{phone}</span>
            </div>
          )}
          <div className="cv-row">
            <MailIcon />
            <span>{cv.email}</span>
          </div>
          {cv.links.map((l) => (
            <div className="cv-row" key={l.href}>
              {linkIcon(l.label)}
              <span>{stripProtocol(l.href)}</span>
            </div>
          ))}
          <div className="cv-row">
            <PinIcon />
            <span>{cv.location}</span>
          </div>
        </div>
      </header>

      <div className="cv-body">
        {/* ---------- LEFT ---------- */}
        <div className="cv-col-l">
          <div className="cv-sec">
            <div className="cv-sec-h">Profile</div>
            <p className="cv-profile">{cv.profile}</p>
          </div>

          <div className="cv-sec">
            <div className="cv-sec-h">Experience</div>
            {cv.roles.map((r) => (
              <div className="cv-job" key={r.title + r.start}>
                <div className="cv-job-top">
                  <div>
                    <span className="cv-job-title">{r.title}</span>{" "}
                    <span className="cv-job-co">· {r.org}</span>
                  </div>
                  <div className="cv-job-dates">
                    {r.start} – {r.end}
                  </div>
                </div>
                {r.stack && (
                  <div className="cv-stack">
                    {r.stack.map((s) => (
                      <span className="cv-tag" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <ul className="cv-bul">
                  {r.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
            {cv.earlier && (
              <div className="cv-job">
                <p className="cv-earlier">
                  <strong>Earlier:</strong> {cv.earlier}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ---------- RIGHT ---------- */}
        <div className="cv-col-r">
          <div className="cv-sec">
            <div className="cv-sec-h">Technical Skills</div>
            {cv.skills.map((s) => (
              <div className="cv-skillgroup" key={s.group}>
                <div className="cv-skill-label">{s.group}</div>
                <div className="cv-pills">
                  {s.items.map((i) => (
                    <span className="cv-pill" key={i}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="cv-sec">
            <div className="cv-sec-h">Education</div>
            {cv.education.map((e) => (
              <div className="cv-edu" key={e.award}>
                <div className="cv-edu-deg">{e.award}</div>
                <div className="cv-edu-meta">{e.place}</div>
                <div className="cv-edu-date">{e.year}</div>
              </div>
            ))}
          </div>

          {cv.strengths && (
            <div className="cv-sec">
              <div className="cv-sec-h">Strengths</div>
              {cv.strengths.map((s, i) => (
                <div className="cv-strength" key={i}>
                  {s}
                </div>
              ))}
            </div>
          )}

          {cv.metrics && (
            <div className="cv-sec">
              <div className="cv-sec-h">Selected Impact</div>
              {cv.metrics.map((m) => (
                <div className="cv-metric" key={m.value}>
                  <span className="cv-metric-num">{m.value}</span>
                  <span className="cv-metric-lab">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="cv-footer">
        References available on request &nbsp;·&nbsp; {cv.name} — {cv.tagline}
      </footer>
    </div>
  );
}
