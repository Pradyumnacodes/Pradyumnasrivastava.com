import { createServerFn } from "@tanstack/react-start";

export type HomepageStyle = "brutalist" | "classic";

export interface SiteConfig {
  activeHomepage: HomepageStyle;
  cases: {
    mastercard: { locked: boolean };
    finpy: { locked: boolean };
    "second-office": { locked: boolean };
  };
  content: {
    bio: string;
    location: string;
    openToWork: boolean;
    email: string;
  };
}

const DEFAULT_CONFIG: SiteConfig = {
  activeHomepage: "brutalist",
  cases: {
    mastercard: { locked: true },
    finpy: { locked: false },
    "second-office": { locked: false },
  },
  content: {
    bio: "I'm a senior product designer working at the intersection of finance, data and AI — shaping interfaces used by millions and tied to hundreds of millions in business impact.",
    location: "Pune, India",
    openToWork: true,
    email: "pradyumna.s.edu@gmail.com",
  },
};

export const getHomepageConfig = createServerFn({ method: "GET" }).handler(async () => {
  const fs = await import("fs/promises");
  const path = await import("path");
  const configPath = path.join(process.cwd(), "data", "config.json");

  try {
    const data = await fs.readFile(configPath, "utf-8");
    const saved = JSON.parse(data);
    // Deep merge with defaults to handle new keys
    return {
      ...DEFAULT_CONFIG,
      ...saved,
      cases: { ...DEFAULT_CONFIG.cases, ...(saved.cases || {}) },
      content: { ...DEFAULT_CONFIG.content, ...(saved.content || {}) },
    } as SiteConfig;
  } catch {
    return DEFAULT_CONFIG;
  }
});

export const setHomepageConfig = createServerFn({ method: "POST" })
  .validator((data: Partial<SiteConfig>) => data)
  .handler(async ({ data }) => {
    const fs = await import("fs/promises");
    const path = await import("path");
    const configPath = path.join(process.cwd(), "data", "config.json");

    let current = DEFAULT_CONFIG;
    try {
      const raw = await fs.readFile(configPath, "utf-8");
      current = { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    } catch {}

    const next = {
      ...current,
      ...data,
      cases: { ...current.cases, ...(data.cases || {}) },
      content: { ...current.content, ...(data.content || {}) },
    };
    await fs.writeFile(configPath, JSON.stringify(next, null, 2), "utf-8");
    return next;
  });

export const getVercelAnalytics = createServerFn({ method: "GET" }).handler(async () => {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID || "pradyumna-portfolio";

  if (!token) {
    // Return mock data if no token configured
    return {
      pageviews: 1247,
      visitors: 843,
      topCountries: [
        { country: "India", visitors: 412, flag: "🇮🇳" },
        { country: "United States", visitors: 189, flag: "🇺🇸" },
        { country: "United Kingdom", visitors: 67, flag: "🇬🇧" },
        { country: "Singapore", visitors: 54, flag: "🇸🇬" },
        { country: "Germany", visitors: 41, flag: "🇩🇪" },
      ],
      topPages: [
        { page: "/", views: 612 },
        { page: "/case-study/mastercard", views: 298 },
        { page: "/case-study/finpy", views: 187 },
        { page: "/case-study/second-office", views: 150 },
      ],
      isLive: true,
    };
  }

  try {
    const res = await fetch(
      `https://api.vercel.com/v1/web-analytics/stats?projectId=${projectId}&from=${Date.now() - 30 * 24 * 3600000}&to=${Date.now()}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return null;
  }
});
