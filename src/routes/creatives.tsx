import { createFileRoute, Link } from "@tanstack/react-router";
import { AuroraFooter } from "@/components/AuroraFooter";
import { MediumMarquee } from "@/components/MediumMarquee";
import { MEDIUM_STORIES, CREATIVE_ITEMS, type CreativeItem } from "@/data/creatives-data";

export const Route = createFileRoute("/creatives")({
  head: () => ({
    meta: [
      { title: "Creatives — Pradyumna Srivastava" },
      {
        name: "description",
        content:
          "A working dump of side studies, UI deconstructions, and shipped work that didn't make the case-study cut.",
      },
      { property: "og:title", content: "Creatives — Pradyumna Srivastava" },
      {
        property: "og:description",
        content:
          "Side studies, UI deconstructions, and shipped work — a working dump, updated often.",
      },
    ],
  }),
  component: CreativesPage,
});

function CreativeCard({ item }: { item: CreativeItem }) {
  const content = (
    <>
      {item.image && (
        <div className="overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className={`w-full aspect-[5/3] object-cover ${
              item.href ? "transition-transform duration-700 group-hover:scale-[1.04]" : ""
            }`}
          />
        </div>
      )}
      <div className="p-8 flex flex-col flex-1">
        <span
          className={`text-xs font-medium uppercase tracking-[0.15em] mb-3 ${
            item.dark ? "opacity-50" : "opacity-70"
          }`}
        >
          {item.tag}
        </span>
        <h3 className={`font-serif text-2xl mb-2 leading-snug ${item.dark ? "" : "text-deep-ink"}`}>
          {item.title}
        </h3>
        <p className={`text-sm ${item.dark ? "opacity-60" : "opacity-70"}`}>{item.body}</p>
        {item.href && (
          <span
            className={`mt-4 text-xs font-mono uppercase tracking-[0.18em] inline-flex items-center gap-2 ${
              item.dark ? "opacity-60" : "opacity-50"
            } group-hover:opacity-100 transition-opacity`}
          >
            Open{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        )}
      </div>
    </>
  );

  const containerClassName = `${item.span} ${
    item.dark ? "bg-deep-ink text-paper" : "bg-surface ring-1 ring-black/5"
  } rounded-3xl overflow-hidden flex flex-col min-h-[280px] ${
    item.href
      ? "group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]"
      : ""
  }`;

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={containerClassName}>
        {content}
      </a>
    );
  }

  return <article className={containerClassName}>{content}</article>;
}

function CreativesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <nav className="fixed top-0 inset-x-0 z-50 bg-paper/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-medium tracking-tight text-deep-ink">
            Pradyumna <span className="opacity-50">Srivastava</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium opacity-60">
            <Link to="/" className="hover:opacity-100 transition-opacity">
              Home
            </Link>
            <Link to="/work" className="hover:opacity-100 transition-opacity">
              Work
            </Link>
            <Link
              to="/creatives"
              className="hover:opacity-100 transition-opacity"
              activeProps={{ className: "opacity-100" }}
            >
              Creatives
            </Link>
          </div>
        </div>
      </nav>

      <header className="pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-12 opacity-50">
            <span className="font-mono text-xs tabular">/creatives</span>
            <div className="h-px w-12 bg-current" />
            <span className="text-xs font-medium uppercase tracking-[0.18em]">Working dump</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-deep-ink leading-[0.95] tracking-tight font-medium text-balance mb-8 max-w-[18ch]">
            Side studies, scraps, and shipped odds-and-ends.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl opacity-75 max-w-[44ch]">
            Not case studies — just the work that keeps the hand sharp. Updated as I make more.
          </p>
        </div>
      </header>

      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
          {CREATIVE_ITEMS.map((item) => (
            <CreativeCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="pb-32 -mt-12">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex items-baseline justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-60 block mb-2">
              Writing · Medium
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-deep-ink tracking-tight">
              Notes from the practice.
            </h2>
          </div>
          <a
            href="https://medium.com/@ecapsdesign"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 opacity-70 hover:opacity-100"
          >
            All stories on Medium →
          </a>
        </div>
        <MediumMarquee stories={MEDIUM_STORIES} />
      </section>

      <AuroraFooter>
        <Link
          to="/work"
          className="font-serif italic text-xl underline underline-offset-8 text-paper"
        >
          ← Selected work
        </Link>
        <Link to="/" className="font-serif italic text-xl underline underline-offset-8 text-paper">
          Back home →
        </Link>
      </AuroraFooter>
    </div>
  );
}
