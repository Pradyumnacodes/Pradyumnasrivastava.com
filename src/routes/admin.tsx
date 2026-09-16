import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  getHomepageConfig,
  setHomepageConfig,
  getVercelAnalytics,
  type SiteConfig,
  type HomepageStyle,
} from "@/lib/admin.functions";
import { PasswordGate, isUnlocked, rememberUnlock } from "@/components/case-study/PasswordGate";
import {
  LayoutTemplate,
  MonitorDot,
  Lock,
  Unlock,
  Globe,
  FileText,
  Users,
  Eye,
  TrendingUp,
  MapPin,
  Mail,
  Briefcase,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ChevronRight,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    const [config, analytics] = await Promise.all([
      getHomepageConfig(),
      getVercelAnalytics(),
    ]);
    return { config, analytics };
  },
  component: AdminPage,
});

type Tab = "overview" | "homepage" | "cases" | "content";

function AdminPage() {
  const { config: initialConfig, analytics } = Route.useLoaderData();
  const [unlocked, setUnlocked] = useState(isUnlocked("admin-dashboard"));
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);
  const updateConfig = useServerFn(setHomepageConfig);
  const router = useRouter();

  if (!unlocked) {
    return (
      <PasswordGate
        studyTitle="Internal Dashboard"
        description="This is the central nervous system of your portfolio. Please authenticate to toggle live settings."
        onSubmit={async (password) => {
          if (password === "mastercard") {
            rememberUnlock("admin-dashboard");
            setUnlocked(true);
          } else {
            throw new Error("Invalid admin credential");
          }
        }}
      />
    );
  }

  const save = async (patch: Partial<SiteConfig>) => {
    setIsUpdating(true);
    const next = { ...config, ...patch } as SiteConfig;
    setConfig(next);
    await updateConfig({ data: patch });
    setIsUpdating(false);
    setSavedFeedback("Saved");
    router.invalidate();
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Activity className="w-4 h-4" /> },
    { id: "homepage", label: "Homepage", icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: "cases", label: "Case Studies", icon: <FileText className="w-4 h-4" /> },
    { id: "content", label: "Content", icon: <Globe className="w-4 h-4" /> },
  ];

  const statCards = analytics
    ? [
        { label: "Page Views", value: analytics.pageviews?.toLocaleString() ?? "—", icon: <Eye className="w-4 h-4" />, sub: "last 30 days" },
        { label: "Unique Visitors", value: analytics.visitors?.toLocaleString() ?? "—", icon: <Users className="w-4 h-4" />, sub: "last 30 days" },
        { label: "Top Page", value: analytics.topPages?.[0]?.page ?? "/", icon: <TrendingUp className="w-4 h-4" />, sub: `${analytics.topPages?.[0]?.views ?? 0} views` },
        { label: "Live Status", value: analytics.isLive ? "Online" : "Offline", icon: <Activity className="w-4 h-4" />, sub: "pradyumnasrivastava.com", isStatus: true, live: analytics.isLive },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      {/* Topbar */}
      <header className="border-b border-white/[0.06] px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 bg-[#080808]/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">pradyumna</span>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">admin</span>
        </div>
        <div className="flex items-center gap-3">
          {isUpdating && (
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <RefreshCw className="w-3 h-3 animate-spin" /> Saving…
            </span>
          )}
          {savedFeedback && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <CheckCircle2 className="w-3 h-3" /> {savedFeedback}
            </span>
          )}
          <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-white/40 font-mono">live</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Portfolio Command Centre</h1>
          <p className="text-white/40 text-sm mt-2">Manage your live portfolio settings in real time.</p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 mb-10 border-b border-white/[0.06] pb-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === t.id
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-4 text-white/30">
                    {s.icon}
                    {"isStatus" in s && (
                      <span className={`flex h-1.5 w-1.5 rounded-full ${s.live ? "bg-green-500" : "bg-red-500"}`} />
                    )}
                  </div>
                  <p className={`text-2xl font-semibold ${"isStatus" in s ? (s.live ? "text-green-400" : "text-red-400") : ""}`}>
                    {s.value}
                  </p>
                  <p className="text-xs text-white/30 mt-1">{s.label}</p>
                  <p className="text-xs text-white/20 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Countries + Top Pages */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Countries */}
                <div className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin className="w-4 h-4 text-white/30" />
                    <h3 className="text-sm font-medium">Top Countries</h3>
                  </div>
                  <ul className="space-y-3">
                    {(analytics.topCountries ?? []).map((c: { country: string; visitors: number; flag: string }, i: number) => {
                      const max = analytics.topCountries[0]?.visitors || 1;
                      const pct = Math.round((c.visitors / max) * 100);
                      return (
                        <li key={c.country} className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span className="text-white/70">{c.country}</span>
                            </span>
                            <span className="font-mono text-xs text-white/40">{c.visitors.toLocaleString()}</span>
                          </div>
                          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white/40 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Top Pages */}
                <div className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-4 h-4 text-white/30" />
                    <h3 className="text-sm font-medium">Top Pages</h3>
                  </div>
                  <ul className="space-y-3">
                    {(analytics.topPages ?? []).map((p: { page: string; views: number }, i: number) => {
                      const max = analytics.topPages[0]?.views || 1;
                      const pct = Math.round((p.views / max) * 100);
                      return (
                        <li key={p.page} className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-mono text-white/70 text-xs">{p.page}</span>
                            <span className="font-mono text-xs text-white/40">{p.views.toLocaleString()}</span>
                          </div>
                          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white/40 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02]">
              <h3 className="text-sm font-medium mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("homepage")}
                  className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:border-white/30 transition-colors text-white/70 hover:text-white"
                >
                  Switch Homepage →
                </button>
                <button
                  onClick={() => setActiveTab("cases")}
                  className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:border-white/30 transition-colors text-white/70 hover:text-white"
                >
                  Manage Case Studies →
                </button>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:border-white/30 transition-colors text-white/70 hover:text-white"
                >
                  View Live Site ↗
                </a>
                <a
                  href="https://vercel.com/sris-projects-715368bd/pradyumna-portfolio"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:border-white/30 transition-colors text-white/70 hover:text-white"
                >
                  Vercel Dashboard ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* HOMEPAGE TAB */}
        {activeTab === "homepage" && (
          <div className="space-y-6">
            <p className="text-sm text-white/40">Select which homepage is served to public visitors at the root URL. Changes take effect instantly.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["brutalist", "classic"] as HomepageStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => save({ activeHomepage: style })}
                  disabled={isUpdating}
                  className={`text-left p-7 rounded-xl border transition-all duration-300 flex flex-col gap-5 group ${
                    config.activeHomepage === style
                      ? "border-white bg-white/[0.04]"
                      : "border-white/[0.06] hover:border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {style === "brutalist" ? <LayoutTemplate className="w-5 h-5" /> : <MonitorDot className="w-5 h-5" />}
                    {config.activeHomepage === style && (
                      <span className="flex items-center gap-1.5 text-xs text-green-400 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {style === "brutalist" ? "Premium Brutalist" : "Classic Online"}
                    </h3>
                    <p className="text-sm text-white/40 mt-1">
                      {style === "brutalist"
                        ? "High-contrast, elite dark mode — the new design."
                        : "Clean serif layout — the original design."}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CASE STUDIES TAB */}
        {activeTab === "cases" && (
          <div className="space-y-4">
            <p className="text-sm text-white/40 mb-6">Control whether each case study requires NDA authentication to view.</p>
            {(Object.entries(config.cases) as [string, { locked: boolean }][]).map(([slug, cfg]) => {
              const labels: Record<string, string> = {
                mastercard: "Mastercard — AI Portfolio Intelligence",
                finpy: "FinPy — Loan Stigma to Empowerment",
                "second-office": "Second Office — SUS Measurement",
              };
              return (
                <div
                  key={slug}
                  className="flex items-center justify-between p-5 border border-white/[0.06] rounded-xl bg-white/[0.02] hover:border-white/10 transition-colors"
                >
                  <div>
                    <p className="font-medium">{labels[slug]}</p>
                    <p className="text-sm text-white/40 mt-0.5 font-mono">/case-study/{slug}</p>
                  </div>
                  <button
                    onClick={() =>
                      save({
                        cases: {
                          ...config.cases,
                          [slug]: { locked: !cfg.locked },
                        } as SiteConfig["cases"],
                      })
                    }
                    disabled={isUpdating}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      cfg.locked
                        ? "border-amber-500/30 text-amber-400 bg-amber-500/[0.05] hover:bg-amber-500/10"
                        : "border-green-500/30 text-green-400 bg-green-500/[0.05] hover:bg-green-500/10"
                    }`}
                  >
                    {cfg.locked ? (
                      <><Lock className="w-3.5 h-3.5" /> NDA Locked</>
                    ) : (
                      <><Unlock className="w-3.5 h-3.5" /> Public</>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div className="space-y-5">
            <p className="text-sm text-white/40 mb-6">Edit live content on your homepage. Changes take effect on the next visitor page load.</p>

            {/* Bio */}
            <div className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.02] space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-white/30" /> Hero Bio
              </label>
              <textarea
                rows={4}
                value={config.content.bio}
                onChange={(e) => setConfig((c) => ({ ...c, content: { ...c.content, bio: e.target.value } }))}
                onBlur={() => save({ content: config.content })}
                className="w-full bg-transparent border border-white/[0.06] rounded-lg p-3 text-sm text-white/80 resize-none focus:outline-none focus:border-white/20 transition-colors font-serif"
              />
            </div>

            {/* Location */}
            <div className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.02] space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white/30" /> Location
              </label>
              <input
                type="text"
                value={config.content.location}
                onChange={(e) => setConfig((c) => ({ ...c, content: { ...c.content, location: e.target.value } }))}
                onBlur={() => save({ content: config.content })}
                className="w-full bg-transparent border border-white/[0.06] rounded-lg p-3 text-sm text-white/80 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.02] space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/30" /> Contact Email
              </label>
              <input
                type="email"
                value={config.content.email}
                onChange={(e) => setConfig((c) => ({ ...c, content: { ...c.content, email: e.target.value } }))}
                onBlur={() => save({ content: config.content })}
                className="w-full bg-transparent border border-white/[0.06] rounded-lg p-3 text-sm text-white/80 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>

            {/* Open to Work toggle */}
            <div className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-white/30" />
                <div>
                  <p className="text-sm font-medium">Open to Work</p>
                  <p className="text-xs text-white/40 mt-0.5">Shows an availability indicator on your homepage</p>
                </div>
              </div>
              <button
                onClick={() => save({ content: { ...config.content, openToWork: !config.content.openToWork } })}
                disabled={isUpdating}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.content.openToWork ? "bg-green-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    config.content.openToWork ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
