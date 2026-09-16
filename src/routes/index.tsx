import { createFileRoute } from "@tanstack/react-router";
import { getHomepageConfig } from "@/lib/admin.functions";
import { BrutalistHome } from "@/components/home/BrutalistHome";
import { ClassicHome } from "@/components/home/ClassicHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pradyumna Srivastava — Product Designer" },
      {
        name: "description",
        content:
          "Shaping intricate financial infrastructure and machine learning workflows into fast, dependable interfaces used by millions.",
      },
    ],
  }),
  loader: async () => {
    const config = await getHomepageConfig();
    return { config };
  },
  component: Index,
});

function Index() {
  const { config } = Route.useLoaderData();
  
  if (config.activeHomepage === "classic") {
    return <ClassicHome />;
  }
  
  return <BrutalistHome />;
}
