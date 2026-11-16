export interface DirEntry {
  slug: string;
  filename: string;
  size: string;
  date: string;
  permissions: string;
  content: React.ReactNode;
}

export const DIRECTORY_DATA: DirEntry[] = [
  {
    slug: "design-systems-at-scale",
    filename: "design-systems.md",
    size: "14.2K",
    date: "Oct 12 14:23",
    permissions: "-rw-r--r--",
    content: (
      <>
        <h1 className="text-2xl font-medium tracking-tight mb-6">Design Systems at Scale</h1>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Building a design system is easy. Maintaining it across 40+ engineering teams without it turning into a bottleneck is hard.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The core issue usually isn't the components themselves, but the contribution model. If the core team becomes a gatekeeper, product teams will inevitably detach and build custom overrides to meet their deadlines.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The solution is a federated model. Core components remain strictly locked, but "recipes" (composed patterns) are openly contributed by product teams and reviewed asynchronously.
        </p>
      </>
    )
  },
  {
    slug: "the-end-of-flat-design",
    filename: "post-flat-era.txt",
    size: "8.4K",
    date: "Sep 28 09:15",
    permissions: "-rw-r--r--",
    content: (
      <>
        <h1 className="text-2xl font-medium tracking-tight mb-6">The Post-Flat Era</h1>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We spent a decade stripping away textures, gradients, and shadows in the name of "clean" design. We arrived at peak minimalism, and honestly? It got boring.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Now we are seeing the return of tactility. Not skeuomorphism 1.0 with stitched leather and wood grain, but structural tactility. Glassmorphism, inner shadows, ultra-fine borders, and intentional lighting.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Interfaces should feel like physical, precision-milled objects sitting behind the glass of the screen.
        </p>
      </>
    )
  },
  {
    slug: "developer-handoff-myth",
    filename: "handoff_myth.log",
    size: "21.1K",
    date: "Aug 04 18:44",
    permissions: "-r--------",
    content: (
      <>
        <h1 className="text-2xl font-medium tracking-tight mb-6">The Handoff Myth</h1>
        <p className="text-muted-foreground leading-relaxed mb-4">
          "Handoff" implies throwing a Figma file over a wall and hoping it lands perfectly on the other side. This is fundamentally broken.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Designers shouldn't hand off; they should integrate. A designer who understands CSS Flexbox, DOM hierarchy, and state management will inherently design better products.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The future is designers committing code, or at least working directly in the repository for styling and micro-interactions.
        </p>
      </>
    )
  }
];
