import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/casa/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa Bem Otto | Móveis, Estofados e Ambientes Completos" },
      { name: "description", content: "Há 42 anos, a Casa Bem Otto transforma ambientes com móveis, estofados, dormitórios, modulados e atendimento consultivo." },
      { property: "og:title", content: "Casa Bem Otto | Transforme sua casa em lar" },
      { property: "og:description", content: "Curadoria de móveis e decoração, atendimento próximo e suporte pós-venda para criar ambientes completos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
