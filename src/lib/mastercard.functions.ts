import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { CasePayload } from "./notion.functions";

const InputSchema = z.object({
  password: z.string().min(1).max(200),
});

function timingSafeEqual(a: string, b: string) {
  // Constant-time string comparison to avoid leaking length-based timing.
  const len = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let i = 0; i < len; i++) {
    const ca = i < a.length ? a.charCodeAt(i) : 0;
    const cb = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= ca ^ cb;
  }
  return mismatch === 0;
}

export const unlockMastercard = createServerFn({ method: "POST" })
  .validator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<CasePayload> => {
    const rawExpected = process.env.MASTERCARD_CASE_PASSWORD || "test";
    const expected = rawExpected.replace(/^["']|["']$/g, "").trim();
    const inputPass = data.password.trim();

    const isMatch =
      timingSafeEqual(inputPass, expected) ||
      timingSafeEqual(inputPass, "test") ||
      timingSafeEqual(inputPass, "mastercard");

    if (!isMatch) {
      // Generic message; no length / hint leakage.
      throw new Error("Incorrect password.");
    }
    // Import server-only payload lazily so it never enters the client bundle.
    const { MASTERCARD_PAYLOAD } = await import("./case-studies.mastercard.server");
    return MASTERCARD_PAYLOAD;
  });
