import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/notion/v1";

// ----- Types kept narrow to what the slide renderer needs -----
export type RichText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  href?: string | null;
};

export type SlideBlock =
  | { type: "paragraph"; rich: RichText[] }
  | { type: "heading"; level: 1 | 2 | 3; rich: RichText[] }
  | { type: "quote"; rich: RichText[] }
  | { type: "callout"; rich: RichText[]; emoji?: string | null }
  | { type: "bullet"; rich: RichText[] }
  | { type: "numbered"; rich: RichText[] }
  | { type: "image"; url: string; caption?: string; layout?: "split" | "full" | "inline"; context?: string }
  | { type: "divider" }
  | { type: "code"; rich: RichText[]; language?: string }
  | { type: "toggle"; rich: RichText[] };

export interface Slide {
  id: string;
  title: string | null; // heading_2 text
  kicker: string | null; // optional eyebrow
  blocks: SlideBlock[];
}

export interface CasePayload {
  title: string;
  cover: string | null;
  icon: string | null;
  slides: Slide[];
  fetchedAt: number;
}

// ---------------- helpers ----------------
function mapRich(arr: any[] = []): RichText[] {
  return arr
    .map((r) => ({
      text: r?.plain_text ?? "",
      bold: !!r?.annotations?.bold,
      italic: !!r?.annotations?.italic,
      underline: !!r?.annotations?.underline,
      code: !!r?.annotations?.code,
      href: r?.href ?? null,
    }))
    .filter((r) => r.text.length > 0);
}

function richToString(arr: RichText[]) {
  return arr.map((r) => r.text).join("").trim();
}

function imgUrl(block: any): string | null {
  const img = block.image;
  if (!img) return null;
  if (img.type === "file") return img.file?.url ?? null;
  if (img.type === "external") return img.external?.url ?? null;
  return null;
}

async function notionGet(path: string) {
  const apiKey = process.env.LOVABLE_API_KEY;
  const notionKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  if (!notionKey) throw new Error("NOTION_API_KEY missing");
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "X-Connection-Api-Key": notionKey,
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Notion ${path} failed [${res.status}]: ${t.slice(0, 200)}`);
  }
  return res.json();
}

async function fetchAllChildren(blockId: string): Promise<any[]> {
  const out: any[] = [];
  let cursor: string | undefined;
  let safety = 10;
  do {
    const qs = new URLSearchParams({ page_size: "100" });
    if (cursor) qs.set("start_cursor", cursor);
    const data = await notionGet(`/blocks/${blockId}/children?${qs.toString()}`);
    out.push(...(data.results ?? []));
    cursor = data.has_more ? data.next_cursor : undefined;
    safety--;
  } while (cursor && safety > 0);
  return out;
}

function blockToSlideBlock(b: any): SlideBlock | null {
  switch (b.type) {
    case "paragraph": {
      const rich = mapRich(b.paragraph?.rich_text);
      if (rich.length === 0) return null;
      return { type: "paragraph", rich };
    }
    case "heading_1":
      return { type: "heading", level: 1, rich: mapRich(b.heading_1?.rich_text) };
    case "heading_2":
      return { type: "heading", level: 2, rich: mapRich(b.heading_2?.rich_text) };
    case "heading_3":
      return { type: "heading", level: 3, rich: mapRich(b.heading_3?.rich_text) };
    case "quote":
      return { type: "quote", rich: mapRich(b.quote?.rich_text) };
    case "callout":
      return {
        type: "callout",
        rich: mapRich(b.callout?.rich_text),
        emoji: b.callout?.icon?.emoji ?? null,
      };
    case "bulleted_list_item":
      return { type: "bullet", rich: mapRich(b.bulleted_list_item?.rich_text) };
    case "numbered_list_item":
      return { type: "numbered", rich: mapRich(b.numbered_list_item?.rich_text) };
    case "image": {
      const url = imgUrl(b);
      if (!url) return null;
      return { type: "image", url, caption: richToString(mapRich(b.image?.caption)) };
    }
    case "divider":
      return { type: "divider" };
    case "code":
      return {
        type: "code",
        rich: mapRich(b.code?.rich_text),
        language: b.code?.language,
      };
    case "toggle":
      return { type: "toggle", rich: mapRich(b.toggle?.rich_text) };
    default:
      return null;
  }
}

function groupIntoSlides(blocks: any[]): Slide[] {
  const slides: Slide[] = [];
  let current: Slide = { id: "intro", title: null, kicker: "Intro", blocks: [] };

  const flush = () => {
    // Drop trailing dividers / empty slides
    const cleaned = current.blocks.filter(
      (b, i, arr) => !(b.type === "divider" && (i === 0 || i === arr.length - 1)),
    );
    current.blocks = cleaned;
    if (current.blocks.length > 0 || current.title) slides.push(current);
  };

  for (const raw of blocks) {
    const sb = blockToSlideBlock(raw);
    if (!sb) continue;

    // Start a new slide on each heading_2
    if (sb.type === "heading" && sb.level === 2) {
      flush();
      current = {
        id: raw.id,
        title: richToString(sb.rich),
        kicker: null,
        blocks: [],
      };
      continue;
    }

    // Skip dividers between slides (they delimit sections)
    if (sb.type === "divider" && current.blocks.length === 0) continue;

    current.blocks.push(sb);
  }
  flush();

  return slides;
}

export const fetchCaseStudy = createServerFn({ method: "POST" })
  .inputValidator((d: { pageId: string }) => d)
  .handler(async ({ data }) => {
    const { pageId } = data;
    if (!pageId) {
      return {
        title: "",
        cover: null,
        icon: null,
        slides: [],
        fetchedAt: Date.now(),
      } satisfies CasePayload;
    }

    const [page, blocks] = await Promise.all([
      notionGet(`/pages/${pageId}`),
      fetchAllChildren(pageId),
    ]);

    const title =
      richToString(mapRich(page?.properties?.title?.title ?? page?.properties?.Name?.title ?? [])) ||
      "Untitled";

    const coverUrl =
      page?.cover?.type === "file"
        ? page.cover.file?.url
        : page?.cover?.type === "external"
        ? page.cover.external?.url
        : null;

    const iconUrl =
      page?.icon?.type === "file"
        ? page.icon.file?.url
        : page?.icon?.type === "external"
        ? page.icon.external?.url
        : null;

    const slides = groupIntoSlides(blocks);

    // Prepend a cover slide
    const cover: Slide = {
      id: "cover",
      title,
      kicker: "Case Study",
      blocks: coverUrl ? [{ type: "image", url: coverUrl, caption: "" }] : [],
    };

    return {
      title,
      cover: coverUrl ?? null,
      icon: iconUrl ?? null,
      slides: [cover, ...slides],
      fetchedAt: Date.now(),
    } satisfies CasePayload;
  });
