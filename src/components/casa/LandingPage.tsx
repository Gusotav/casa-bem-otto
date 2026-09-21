import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight, Menu, Minus, ShieldCheck, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { casaAssets } from "@/lib/casa-assets";
import { ResponsiveImage } from "./ResponsiveImage";
import { LeadForm } from "./LeadForm";
import { CookieBanner } from "./CookieBanner";
import { GalleryLightbox } from "./GalleryLightbox";

const nav = [{ id: "conceito", label: "Conceito" }, { id: "colecoes", label: "Coleções" }, { id: "diferenciais", label: "Diferenciais" }, { id: "inspiracoes", label: "Inspirações" }, { id: "contato", label: "Contato" }];
const categories = [
  ["Mobiliário & Estofados", "Sofás, poltronas, mesas e cadeiras com ergonomia e acabamentos nobres.", casaAssets.sofas],
  ["Dormitórios & Modulados", "Soluções elegantes para organizar, aproveitar o espaço e viver com conforto.", casaAssets.bedroom],
  ["Decoração & Iluminação", "Objetos curados para dar alma, textura e personalidade ao ambiente.", casaAssets.decor],
  ["Mesa Posta & Utilidades", "Peças refinadas para receber bem e tornar cada refeição especial.", casaAssets.table],
  ["Linha Arquiteto", "Condições e suporte técnico exclusivo para profissionais de interiores.", casaAssets.architect],
] as const;
const comparisons = [
  ["Curadoria de peças", "Peças genéricas e de produção em massa", "Seleção focada em design, textura e elegância"],
  ["Durabilidade e materiais", "Matéria-prima básica com vida útil limitada", "Materiais nobres, estruturas reforçadas e ótimo acabamento"],
  ["Experiência de compra", "Autoatendimento sem orientação de estilo", "Consultoria atenciosa e alinhada ao seu espaço"],
  ["Harmonização", "Peças vendidas isoladamente", "Proposta integrada de móveis, decoração e utilidades"],
  ["Pós-venda", "Atendimento limitado após a entrega", "Assistência técnica e acompanhamento próximo"],
  ["Pagamento", "Pouca flexibilidade", "Facilidade de pagamento em até 12x"],
];
const conceptItems = [["01", "Design atemporal", "Móveis e acessórios pensados para atravessar tendências mantendo o requinte."], ["02", "Conforto & funcionalidade", "Ambientes lindos, práticos e acolhedores para a rotina."], ["03", "Olhar técnico e estético", "Seleção criteriosa de materiais, texturas e acabamentos."]];
const serviceItems = ["Atendimento humano e consultivo", "Entrega com responsabilidade", "Assistência técnica e pós-venda", "Segurança de 42 anos de história"];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplay(value); return; }
      const start = performance.now();
      const duration = 1600;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: .45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref} aria-label={`${prefix}${value.toLocaleString("pt-BR")}${suffix}`}>{prefix}{display.toLocaleString("pt-BR")}{suffix}</span>;
}

export function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuDialog = useRef<HTMLDivElement>(null);
  const heroImage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > Math.max(80, window.innerHeight * .7));
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-32% 0px -58%", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach((element) => sectionObserver.observe(element));
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); sectionObserver.disconnect(); revealObserver.disconnect(); };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduced.matches || !finePointer.matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - .5) * 14;
        const y = (event.clientY / window.innerHeight - .5) * 10;
        heroImage.current?.style.setProperty("--parallax-x", `${x}px`);
        heroImage.current?.style.setProperty("--parallax-y", `${y}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenu(false); menuButton.current?.focus(); }
      if (event.key === "Tab" && menu && menuDialog.current) {
        const focusable = Array.from(menuDialog.current.querySelectorAll<HTMLElement>("a,button"));
        const first = focusable[0]; const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", keydown); };
  }, [menu]);

  return <>
    <header className={`fixed inset-x-0 top-0 z-50 h-18 transition-all duration-500 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
      <nav aria-label="Navegação principal" className="section-shell grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <a href="#inicio" aria-label="Casa Bem Otto — início" className="min-w-0"><img src={casaAssets.logo} width="560" height="110" alt="Casa Bem Otto" className="h-9 w-auto max-w-52 object-contain brightness-0 invert sm:h-10" /></a>
        <div className="hidden items-center gap-6 lg:flex">{nav.map((item) => <a key={item.id} href={`#${item.id}`} className="nav-link relative py-6 text-xs font-semibold text-dark-foreground transition-colors hover:text-primary">{item.label}<span className={`absolute inset-x-0 bottom-4 h-px bg-primary transition-transform ${active === item.id ? "scale-x-100" : "scale-x-0"}`} /></a>)}<Button variant="premium" size="touch" onClick={() => scrollTo("contato")}>Solicitar orçamento</Button></div>
        <Button ref={menuButton} variant="glassDark" size="icon" className="size-11 lg:hidden" onClick={() => setMenu(true)} aria-label="Abrir menu" aria-expanded={menu}><Menu /></Button>
        <div className="absolute inset-x-0 bottom-1 flex justify-center gap-2 lg:hidden" aria-label="Seção atual">{nav.map((item) => <a key={item.id} href={`#${item.id}`} aria-label={`Ir para ${item.label}`} className={`h-1 rounded-full transition-all ${active === item.id ? "w-5 bg-primary" : "w-1 bg-dark-foreground/35"}`} />)}</div>
      </nav>
    </header>
    {menu && <div ref={menuDialog} className="fixed inset-0 z-[60] bg-surface-dark p-5 text-dark-foreground lg:hidden" role="dialog" aria-modal="true" aria-label="Menu"><div className="flex items-center justify-between"><img src={casaAssets.logo} alt="Casa Bem Otto" className="h-10 w-auto max-w-52 brightness-0 invert" /><Button variant="glassDark" size="icon" autoFocus className="size-11" onClick={() => { setMenu(false); menuButton.current?.focus(); }} aria-label="Fechar menu"><X /></Button></div><div className="mt-12 grid gap-1">{nav.map((item, index) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenu(false)} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center border-b border-dark-line py-5"><span className="mr-4 text-xs text-primary">0{index + 1}</span><span className="min-w-0 truncate font-display text-2xl font-semibold">{item.label}</span><ChevronRight /></a>)}</div><Button variant="premium" size="touch" className="mt-8 w-full" onClick={() => { setMenu(false); scrollTo("contato"); }}>Solicitar orçamento</Button></div>}

    <main>
      <section id="inicio" className="relative min-h-screen min-h-[100svh] overflow-hidden bg-surface-dark text-dark-foreground">
        <div className="relative flex min-h-screen min-h-[100svh] items-center overflow-hidden pt-20">
          <div ref={heroImage} className="hero-parallax absolute inset-[-2%]"><ResponsiveImage asset={casaAssets.hero} alt="Ambiente de jantar Casa Bem Otto com mesa, cadeiras e mobiliário modulado" eager className="size-full object-cover object-center" /></div>
          <div className="hero-shade absolute inset-0" />
          <div className="section-shell relative grid w-full gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,.78fr)] lg:items-center lg:gap-14 lg:py-24 xl:gap-20">
            <div className="max-w-3xl" data-reveal><p className="eyebrow text-primary"><span className="h-px w-8 bg-primary" />42 anos transformando casas em lares</p><h1 className="display-title hero-title mt-4">Onde design e aconchego transformam o seu lar.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-dark-muted sm:text-lg">Uma curadoria exclusiva em móveis, decoração e utilidades para compor ambientes sofisticados, funcionais e com a sua identidade.</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-dark-foreground">{["Curadoria exclusiva", "Soluções completas", "Consultoria personalizada"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</span>)}</div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button variant="premium" size="touch" onClick={() => scrollTo("contato")}>Solicitar orçamento personalizado <ArrowRight /></Button><Button variant="glassDark" size="touch" onClick={() => scrollTo("hero-form")}>Receber catálogo exclusivo</Button></div><p className="mt-6 max-w-xl border-l border-primary pl-4 text-sm leading-6 text-dark-muted">Mais de 40.000 clientes atendidos com atendimento próximo, móveis de qualidade e suporte pós-venda.</p></div>
            <div id="hero-form" className="hero-form dark-glass p-5 sm:p-6" data-reveal><div className="mb-5"><p className="eyebrow text-primary">Atendimento VIP</p><h2 className="mt-2 font-display text-2xl font-semibold text-dark-foreground sm:text-3xl">Receba o catálogo exclusivo.</h2><p className="mt-2 text-sm leading-6 text-dark-muted">Conte o que procura para iniciarmos uma conversa mais relevante.</p></div><LeadForm /></div>
          </div>
          <a href="#conceito" aria-label="Ir para a próxima seção" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-dark-muted 2xl:block"><ArrowDown /></a>
        </div>
      </section>

      <section id="conceito" className="section-space bg-background"><div className="section-shell grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20"><div className="relative mx-auto w-full max-w-xl pb-14 pr-8" data-reveal><ResponsiveImage asset={casaAssets.conceptMain} alt="Cozinha modulada Casa Bem Otto em acabamento claro e madeira" className="aspect-[4/5] w-full object-cover" sizes="(min-width:1024px) 45vw, 100vw" /><ResponsiveImage asset={casaAssets.conceptDetail} alt="Detalhe de armário e nichos em madeira natural" className="absolute bottom-0 right-0 aspect-[4/5] w-[42%] border-8 border-background object-cover shadow-premium" sizes="25vw" /></div><div data-reveal><p className="eyebrow">O conceito Casa Bem Otto</p><h2 className="section-title mt-4 max-w-2xl">Mais do que decorar: criar momentos e memórias.</h2><p className="body-copy mt-6">Acreditamos que a casa é a extensão da nossa essência. Por isso, reunimos coleções que alinham linhas elegantes, materiais nobres e utilidades inteligentes para o dia a dia.</p><div className="mt-9 grid gap-3">{conceptItems.map(([number, title, description]) => <article key={number} className="value-card group"><span className="value-number">{number}</span><div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div></article>)}</div><Button variant="premium" size="touch" className="mt-7" onClick={() => scrollTo("colecoes")}>Conhecer nossas coleções <ArrowRight /></Button></div></div></section>

      <section id="colecoes" className="section-space bg-surface-soft"><div className="section-shell"><div className="max-w-4xl" data-reveal><p className="eyebrow">Coleções</p><h2 className="section-title mt-4">Tudo o que seu ambiente precisa, com a curadoria que você procura.</h2><p className="body-copy mt-5">Explore linhas escolhidas para harmonizar cada canto do seu imóvel.</p></div><div className="collections-row hide-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:flex xl:gap-2">{categories.map(([title, description, asset], index) => <article key={title} className="collection-card group relative min-h-[420px] w-[82vw] shrink-0 snap-center overflow-hidden md:w-auto xl:min-w-0 xl:flex-1" data-reveal><ResponsiveImage asset={asset} alt={`${title} no showroom Casa Bem Otto`} className="image-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(min-width:1280px) 20vw, (min-width:768px) 50vw, 82vw" /><div className="card-shade absolute inset-0" /><div className="absolute inset-x-0 bottom-0 p-5 text-dark-foreground"><span className="text-xs font-semibold text-primary">0{index + 1}</span><h3 className="mt-2 font-display text-xl font-semibold xl:text-2xl">{title}</h3><p className="mt-2 text-sm leading-5 text-dark-muted">{description}</p></div></article>)}</div><div className="mt-3 flex items-center gap-3 md:hidden"><span className="h-px flex-1 bg-border" /><span className="text-xs text-muted-foreground">Deslize para explorar</span></div><div className="mt-8"><Button variant="premium" size="touch" onClick={() => scrollTo("contato")}>Solicitar atendimento especializado</Button></div></div></section>

      <section id="diferenciais" className="section-space bg-surface-dark text-dark-foreground"><div className="section-shell"><div className="max-w-3xl" data-reveal><p className="eyebrow text-primary">Uma escolha segura</p><h2 className="section-title mt-4">O que faz da Casa Bem Otto a escolha ideal?</h2><p className="mt-5 max-w-2xl text-dark-muted">Compare os padrões convencionais do mercado com nossa proposta de valor.</p></div><div className="comparison-table mt-12 hidden overflow-hidden md:block" data-reveal><div className="grid grid-cols-[.7fr_1fr_1.1fr] text-sm font-semibold"><span className="p-5">Critério</span><span className="p-5 text-dark-muted">Varejo comum</span><span className="comparison-best-head p-5">Casa Bem Otto</span></div>{comparisons.map(([title, common, casa]) => <div key={title} className="comparison-row grid grid-cols-[.7fr_1fr_1.1fr] text-sm"><strong className="p-5">{title}</strong><span className="flex gap-2 p-5 text-dark-muted"><Minus className="mt-0.5 size-4 shrink-0" />{common}</span><span className="comparison-best flex gap-2 p-5 font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{casa}</span></div>)}</div><div className="mt-9 grid gap-3 md:hidden">{comparisons.map(([title, common, casa]) => <article key={title} className="dark-glass p-5" data-reveal><h3 className="font-display text-xl font-semibold">{title}</h3><div className="mt-4 border-l border-dark-line pl-3"><span className="text-[10px] font-bold uppercase text-dark-muted">Varejo comum</span><p className="mt-1 text-sm text-dark-muted">{common}</p></div><div className="mt-4 rounded-md border border-primary/35 bg-primary-soft p-3"><span className="text-[10px] font-bold uppercase text-primary">Casa Bem Otto</span><p className="mt-1 text-sm font-semibold">{casa}</p></div></article>)}</div><Button variant="premium" size="touch" className="mt-9 max-w-full whitespace-normal text-center" onClick={() => scrollTo("contato")}>Quero montar meu espaço <ArrowRight /></Button></div></section>

      <section className="section-space bg-surface-dark-soft text-dark-foreground" aria-labelledby="numeros-title"><div className="section-shell"><div className="max-w-3xl" data-reveal><p className="eyebrow text-primary">Solidez comprovada</p><h2 id="numeros-title" className="section-title stats-title mt-4">Confiança construída <span className="lg:block">ao longo do tempo.</span></h2></div><div className="stats-grid mt-12">{[[<CountUp value={42} />, "anos de tradição"], [<CountUp value={40000} prefix="+" />, "clientes atendidos"], [<CountUp value={12} suffix="x" />, "para facilitar sua compra"], [<ShieldCheck key="shield" className="size-12 text-primary" />, "Pós-venda e assistência técnica"]].map(([value, label]) => <article key={label as string} className="stat-card" data-reveal><strong className="font-display text-[clamp(2.4rem,4.2vw,3.9rem)] font-semibold leading-none text-primary">{value}</strong><span className="stat-label block max-w-44 text-sm leading-5 text-dark-muted">{label}</span></article>)}</div></div></section>

      <section id="inspiracoes" className="section-space bg-background"><div className="section-shell"><div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end" data-reveal><div><p className="eyebrow">Inspirações reais</p><h2 className="section-title mt-4 max-w-3xl">Ambientes que revelam novas possibilidades.</h2></div><p className="body-copy lg:justify-self-end">Explore detalhes, composições e soluções do acervo Casa Bem Otto. Toque em uma imagem para ampliar.</p></div><GalleryLightbox /><div className="mt-9 text-center"><Button variant="premium" size="touch" onClick={() => scrollTo("contato")}>Ver inspirações no WhatsApp</Button><p className="mt-3 text-xs text-muted-foreground">O contato será configurado futuramente; por enquanto, você será direcionado ao formulário.</p></div></div></section>

      <section className="section-space bg-surface-dark text-dark-foreground"><div className="section-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div data-reveal><p className="eyebrow text-primary">Cuidado contínuo</p><h2 className="section-title mt-4">Seu projeto não termina na entrega.</h2><p className="mt-5 max-w-xl leading-7 text-dark-muted">Nossa equipe acompanha cada etapa com atenção, suporte e assistência técnica para que sua casa seja vivida com tranquilidade.</p><Button variant="premium" size="touch" className="mt-7" onClick={() => scrollTo("contato")}>Falar com um consultor <ArrowRight /></Button></div><div className="grid gap-3 sm:grid-cols-2">{serviceItems.map((item, index) => <article key={item} className="service-card group" data-reveal><span className="flex size-10 items-center justify-center rounded-full border border-primary/35 bg-primary-soft text-xs font-semibold text-primary">0{index + 1}</span><h3 className="mt-8 max-w-52 font-display text-xl font-semibold">{item}</h3></article>)}</div></div></section>

      <section id="contato" className="relative overflow-hidden bg-surface-dark text-dark-foreground"><ResponsiveImage asset={casaAssets.closing} alt="Ambiente Casa Bem Otto com mobiliário em madeira" className="absolute inset-0 size-full object-cover opacity-15" /><div className="closing-shade absolute inset-0" /><div className="section-shell section-space relative grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start"><div data-reveal><p className="eyebrow text-primary">Comece sua transformação</p><h2 className="section-title mt-4">Pronto para transformar seu lar?</h2><p className="mt-6 max-w-xl leading-7 text-dark-muted">Preencha seus dados e deixe suas preferências registradas para um futuro atendimento personalizado.</p><div className="trust-proof mt-8"><Users className="size-6 shrink-0 text-primary" /><div><strong className="block font-display text-[clamp(2.4rem,5vw,4.25rem)] font-semibold leading-none text-primary">+40.000</strong><span className="mt-2 block text-sm text-dark-foreground">clientes atendidos</span></div></div></div><div className="final-form-card rounded-lg bg-surface-bright p-5 text-foreground shadow-premium sm:p-8" data-reveal><LeadForm variant="final" /></div></div></section>
    </main>

    <footer className="border-t border-dark-line bg-surface-dark py-12 text-dark-foreground"><div className="section-shell grid gap-10 md:grid-cols-3"><div><img src={casaAssets.logo} alt="Casa Bem Otto" className="h-10 w-auto max-w-56 brightness-0 invert" /><p className="mt-4 max-w-xs text-sm leading-6 text-dark-muted">Tradição, conforto e atendimento próximo para transformar casas em lares.</p></div><nav aria-label="Links do rodapé" className="grid content-start gap-3 text-sm">{nav.slice(0, 4).map((item) => <a key={item.id} href={`#${item.id}`} className="text-dark-muted transition-colors hover:text-primary">{item.label}</a>)}</nav><div className="grid content-start gap-3 text-sm"><a href="https://www.instagram.com/casabemotto/" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a><a href="/politica-de-privacidade" className="hover:text-primary">Política de Privacidade</a><a href="/politica-de-cookies" className="hover:text-primary">Política de Cookies</a></div></div><div className="section-shell mt-10 border-t border-dark-line pt-6 text-xs text-dark-muted">© {new Date().getFullYear()} Casa Bem Otto · Folina Comércios de Móveis Ltda.</div></footer>
    <CookieBanner />
  </>;
}