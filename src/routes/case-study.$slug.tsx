import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getCaseStudy, type CaseStudyConfig } from "@/lib/case-studies";
import { fetchCaseStudy, type CasePayload } from "@/lib/notion.functions";
import { unlockMastercard } from "@/lib/mastercard.functions";
import { SlideDeck } from "@/components/case-study/SlideDeck";
import { PasswordGate, isUnlocked, rememberUnlock } from "@/components/case-study/PasswordGate";

export const Route = createFileRoute("/case-study/$slug")({
  head: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) {
      return { meta: [{ title: "Case study not found" }] };
    }
    return {
      meta: [
        { title: `${study.title} — Pradyumna Srivastava` },
        { name: "description", content: study.summary },
        { property: "og:title", content: study.title },
        { property: "og:description", content: study.summary },
      ],
    };
  },
  beforeLoad: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  component: CaseStudyPage,
  notFoundComponent: () => (
    <div className="min-h-dvh flex items-center justify-center font-serif text-foreground bg-background">
      <div className="text-center">
        <p className="font-mono text-xs text-muted-foreground mb-3">404</p>
        <h1 className="text-3xl mb-6">No case study at that link.</h1>
        <Link to="/work" className="underline underline-offset-4 text-foreground">
          ← Back to work
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-dvh flex items-center justify-center font-serif text-foreground bg-background px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs text-muted-foreground mb-3">Something broke</p>
        <h1 className="text-2xl mb-4">Couldn't load this case study.</h1>
        <p className="text-sm text-foreground mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-foreground text-background rounded-full px-5 py-2 text-sm font-semibold"
        >
          Retry
        </button>
      </div>
    </div>
  ),
});

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const { study } = Route.useRouteContext();

  if (study.serverProtected) {
    return <ProtectedDeck study={study} slug={slug} />;
  }
  return <LoadedDeck study={study} />;
}

function ProtectedDeck({ study, slug }: { study: CaseStudyConfig; slug: string }) {
  const unlock = useServerFn(unlockMastercard);
  const [payload, setPayload] = useState<CasePayload | null>(null);

  // Session memory: if already unlocked this session, auto-retry with stored token.
  // Note: we still need a password to fetch — sessionStorage flag alone is not enough,
  // so we re-prompt on hard reload. This is intentional for security.
  useEffect(() => {
    if (!isUnlocked(slug)) return;
    // no-op: we keep the gate visible, user re-enters once per fresh load.
  }, [slug]);

  if (payload) {
    return <SlideDeck study={study} payload={payload} />;
  }

  return (
    <PasswordGate
      studyTitle={study.title}
      onSubmit={async (password) => {
        const data = await unlock({ data: { password } });
        rememberUnlock(slug);
        setPayload(data);
      }}
    />
  );
}

function LoadedDeck({ study }: { study: CaseStudyConfig }) {
  // Static payload bypasses Notion entirely.
  if (study.staticPayload) {
    return <SlideDeck study={study} payload={study.staticPayload} />;
  }

  const fetchFn = useServerFn(fetchCaseStudy);
  const { data, isLoading, error } = useQuery({
    queryKey: ["case-study", study.slug],
    queryFn: () => fetchFn({ data: { pageId: study.notionPageId } }),
    enabled: !!study.notionPageId,
    staleTime: 5 * 60 * 1000, // images are signed for ~1h
  });

  if (!study.notionPageId) {
    return <MissingNotion study={study} />;
  }

  if (isLoading) {
    return <DeckLoading study={study} />;
  }

  if (error || !data) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background text-foreground px-6">
        <div className="text-center max-w-md">
          <p className="font-mono text-xs text-muted-foreground mb-3">Notion error</p>
          <h1 className="font-serif text-3xl mb-4">Couldn't pull the case study content.</h1>
          <p className="text-sm text-foreground mb-6">
            {(error as Error)?.message ??
              "Check that the Notion page is shared with the integration."}
          </p>
          <Link to="/work" className="underline underline-offset-4 text-foreground">
            ← Back to work
          </Link>
        </div>
      </div>
    );
  }

  return <SlideDeck study={study} payload={data} />;
}

function DeckLoading({ study }: { study: CaseStudyConfig }) {
  // Animated dot ticker
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? "." : d + ".")), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="min-h-dvh bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <span
            aria-hidden
            className="block h-2 w-2 rounded-full"
            style={{ backgroundColor: study.accent }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
            {study.eyebrow}
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 tracking-tight">
          {study.title}
        </h1>
        <p className="font-mono text-xs text-muted-foreground">Loading the deck{dots}</p>
      </div>
    </div>
  );
}

function MissingNotion({ study }: { study: CaseStudyConfig }) {
  return (
    <div className="min-h-dvh bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-lg">
        <div className="flex items-center gap-2 mb-4">
          <span
            aria-hidden
            className="block h-2 w-2 rounded-full"
            style={{ backgroundColor: study.accent }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
            {study.eyebrow}
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 tracking-tight">
          {study.title}
        </h1>
        <p className="font-serif italic text-lg text-foreground mb-6">{study.summary}</p>
        <div className="rounded-2xl bg-surface ring-1 ring-border p-5 text-sm text-foreground">
          This deck is queued. Drop the Notion page URL into{" "}
          <code className="font-mono bg-foreground/10 px-1.5 py-0.5 rounded">src/lib/case-studies.ts</code>{" "}
          and it'll render here automatically.
        </div>
        <Link to="/work" className="inline-block mt-6 underline underline-offset-4 text-foreground">
          ← Back to work
        </Link>
      </div>
    </div>
  );
}
