## Problem

On the home page, two tiles look broken:
- **"Turning manual workflows into scalable global commerce systems"** (goGlocal) — current `caseGoglocal` asset has heavy whitespace and odd cropping inside an aspect-[5/3] frame.
- **"Designing for trust in lending"** (Zype) — current `caseZype` asset is distorted inside an aspect-[4/3] frame.

The container layouts (edge-to-edge, no padding, `object-cover`) are already correct from the previous pass — the actual image files are the issue.

## Approach

Generate two new editorial-quality images sized to fit the existing aspect ratios, inspired by (not copied from) goglocal.in and getzype.in:

### 1. goGlocal replacement — `src/assets/case-goglocal.jpg` (1600×960, 5/3)
Inspiration from goglocal.in (cross-border commerce, SKU/logistics/payments):
- Visual concept: an abstract editorial composition suggesting global commerce infrastructure — a stylised world map fragment with subtle logistics routes, layered with a faint dashboard panel showing SKU/shipment cards. Warm neutral palette with a single accent (deep teal or indigo) consistent with goGlocal's clean, professional B2B tone.
- No literal logos, no copied screenshots. Edge-to-edge composition, no internal whitespace.

### 2. Zype replacement — `src/assets/case-zype.jpg` (1600×1200, 4/3)
Inspiration from getzype.in (D2C credit app, gamified repayment, trust):
- Visual concept: a tasteful mobile-lending hero — a dark phone-shaped surface with a soft glowing credit-progress arc and abstract repayment milestones, sitting against a warm gradient (Zype's signature warm/orange-pink energy). Suggests trust + gamified progress without copying any actual screen.
- No literal logos. Edge-to-edge, no internal whitespace, composed to fill the 4/3 frame cleanly.

### Steps
1. Use `imagegen--generate_image` (standard quality) to create both assets at the target aspect ratios, overwriting the existing files in `src/assets/`.
2. Verify the imports in `src/routes/index.tsx` and `src/routes/creatives.tsx` still resolve (filenames unchanged).
3. Visually QA in the preview that both tiles fill cleanly with no whitespace bleed or distortion.

### Out of scope
- No layout/markup changes in `index.tsx` or `creatives.tsx` — only the image files are swapped.
- No changes to the Mastercard tile or other case studies.