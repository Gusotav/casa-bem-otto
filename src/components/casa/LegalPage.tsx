import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { casaAssets } from "@/lib/casa-assets";

type Section = { title: string; paragraphs: string[] };
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return <main className="min-h-screen bg-background"><header className="border-b bg-surface-bright"><div className="section-shell flex min-h-20 items-center justify-between gap-4"><a href="/" aria-label="Casa Bem Otto — início"><img src={casaAssets.logo} alt="Casa Bem Otto" className="h-8 w-auto max-w-48" /></a><Button asChild variant="outline"><a href="/"><ArrowLeft />Voltar</a></Button></div></header><article className="section-shell max-w-4xl py-16 sm:py-24"><p className="eyebrow">Transparência e cuidado</p><h1 className="display-title mt-4 text-5xl sm:text-6xl">{title}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{intro}</p><p className="mt-4 text-xs text-muted-foreground">Versão informativa sujeita a validação jurídica.</p><div className="mt-12 space-y-10">{sections.map((section) => <section key={section.title}><h2 className="font-display text-3xl font-semibold">{section.title}</h2>{section.paragraphs.map((p) => <p key={p} className="mt-3 leading-7 text-muted-foreground">{p}</p>)}</section>)}</div></article></main>;
}