import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/casa/LegalPage";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({ meta: [
    { title: "Política de Privacidade | Casa Bem Otto" },
    { name: "description", content: "Saiba como a Casa Bem Otto coleta, utiliza e protege seus dados pessoais." },
    { property: "og:title", content: "Política de Privacidade | Casa Bem Otto" },
    { property: "og:description", content: "Informações sobre dados pessoais, finalidades e direitos conforme a LGPD." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Privacy,
});

function Privacy() { return <LegalPage title="Política de Privacidade" intro="Esta política explica, de forma simples, como os dados enviados pelos canais da Casa Bem Otto podem ser tratados." sections={[
  { title: "Dados coletados", paragraphs: ["Podemos coletar nome, WhatsApp, e-mail, cidade, estado, perfil de cliente e informações que você compartilhar sobre seu ambiente ou projeto."] },
  { title: "Como usamos os dados", paragraphs: ["Os dados são usados para atendimento comercial, envio de catálogo, elaboração de orçamento e comunicações relacionadas ao seu interesse. O contato pode ocorrer por WhatsApp, e-mail ou telefone."] },
  { title: "Armazenamento e proteção", paragraphs: ["Adotamos medidas razoáveis para proteger as informações contra acesso indevido, perda ou alteração. Os dados devem ser mantidos apenas pelo período necessário às finalidades informadas e às obrigações legais."] },
  { title: "Compartilhamento", paragraphs: ["Não comercializamos dados pessoais. Informações poderão ser tratadas por fornecedores essenciais ao atendimento, sempre de acordo com a finalidade informada e medidas de proteção adequadas."] },
  { title: "Seus direitos", paragraphs: ["Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção, portabilidade quando aplicável, revogação de consentimento e exclusão, observadas as obrigações legais."] },
  { title: "Como fazer uma solicitação", paragraphs: ["Utilize um canal oficial da Casa Bem Otto para solicitar acesso, alteração ou exclusão dos seus dados. O canal específico será incluído nesta página após validação dos dados institucionais."] },
]} />; }