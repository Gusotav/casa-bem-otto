import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/casa/LegalPage";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () => ({ meta: [
    { title: "Política de Cookies | Casa Bem Otto" },
    { name: "description", content: "Entenda o uso de cookies no site da Casa Bem Otto e gerencie suas preferências." },
    { property: "og:title", content: "Política de Cookies | Casa Bem Otto" },
    { property: "og:description", content: "Informações claras sobre cookies essenciais e preferências de consentimento." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Cookies,
});

function Cookies() { return <LegalPage title="Política de Cookies" intro="Cookies são pequenos registros usados pelo navegador. Aqui explicamos quais categorias podem ser utilizadas e como você controla suas escolhas." sections={[
  { title: "Cookies essenciais", paragraphs: ["São necessários para funções básicas, como lembrar sua preferência de consentimento. Eles não podem ser desativados pelo painel sem comprometer esse funcionamento."] },
  { title: "Cookies analíticos", paragraphs: ["Podem ajudar a compreender o uso do site e melhorar a experiência. Eles não são carregados antes da sua autorização. No momento, esta experiência não ativa ferramentas analíticas não essenciais."] },
  { title: "Gerenciar preferências", paragraphs: ["Você pode aceitar ou recusar cookies não essenciais no aviso exibido ao acessar o site. A escolha fica registrada no seu navegador e pode ser removida ao limpar os dados de navegação."] },
  { title: "Atualizações", paragraphs: ["Esta política poderá ser atualizada se novas ferramentas forem adotadas. Mudanças relevantes devem ser apresentadas de forma transparente."] },
]} />; }