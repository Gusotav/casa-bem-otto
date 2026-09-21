import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { casaAssets } from "@/lib/casa-assets";

type Section = { title: string; paragraphs: string[] };
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return <main className="min-h-screen bg-background"><header className="border-b border-dark-line bg-surface-dark"><div className="section-shell flex min-h-20 items-center justify-between gap-4"><a href="/" aria-label="Casa Bem Otto — início"><img src={casaAssets.logo} alt="Casa Bem Otto" className="h-9 w-auto max-w-52 brightness-0 invert" /></a><Button asChild variant="glassDark"><a href="/"><ArrowLeft />Voltar</a></Button></div></header><article className="section-shell max-w-4xl py-16 sm:py-24"><p className="eyebrow">Transparência e cuidado</p><h1 className="section-title mt-4">{title}</h1><p className="body-copy mt-6">{intro}</p><p className="mt-4 text-xs text-muted-foreground">Versão informativa sujeita a validação jurídica.</p><div className="mt-12 space-y-10">{sections.map((section) => <section key={section.title}><h2 className="font-display text-2xl font-semibold sm:text-3xl">{section.title}</h2>{section.paragraphs.map((p) => <p key={p} className="mt-3 max-w-3xl leading-7 text-muted-foreground">{p}</p>)}</section>)}</div></article></main>;
}