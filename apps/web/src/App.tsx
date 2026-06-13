import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CV from "./pages/CV";
import CVPrint from "./pages/CVPrint";
import About from "./pages/About";

function Nav() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-10">
      <Link to="/" className="font-serif text-xl font-semibold">
        Reece&nbsp;Wall
      </Link>
      <div className="flex gap-5 text-[13.5px] text-nav">
        <Link to="/" className="hover:text-accent">
          Work
        </Link>
        <Link to="/cv" className="hover:text-accent">
          CV
        </Link>
        <Link to="/about" className="hover:text-accent">
          About
        </Link>
      </div>
    </nav>
  );
}

// The site shell: nav + centred column + footer. A layout route — the matched
// child page renders into <Outlet />.
function Shell() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-20">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-3xl px-6 pb-12 text-center text-[11px] text-soft">
        Built with Vite · React · Tailwind · deployed to AWS via Terraform &
        GitHub Actions
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Full-bleed A4 document, no shell — the source the PDF is printed from. */}
      <Route path="/cv/print" element={<CVPrint />} />
      {/* Everything else renders inside the site shell. */}
      <Route element={<Shell />}>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
