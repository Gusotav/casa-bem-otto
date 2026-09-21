import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = { variant?: "hero" | "final" };
type Errors = Record<string, string>;

const phoneMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
};

export function LeadForm({ variant = "hero" }: Props) {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const final = variant === "final";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (name.length < 3) next["name"] = "Informe seu nome completo.";
    if (phone.replace(/\D/g, "").length < 10) next["phone"] = "Informe um WhatsApp válido com DDD.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next["email"] = "Informe um e-mail válido.";
    if (!final && !data.get("focus")) next["focus"] = "Selecione o foco da sua busca.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => { setLoading(false); setSuccess(true); }, 700);
  };

  if (success) return (
    <div role="status" className="grid min-h-64 place-items-center text-center">
      <div><CheckCircle2 className="mx-auto mb-4 size-10 text-primary" /><h3 className="font-display text-3xl font-semibold">Recebemos seu interesse.</h3><p className="mt-3 text-sm text-muted-foreground">A demonstração foi concluída. A integração de atendimento poderá ser conectada depois.</p></div>
    </div>
  );

  const field = final
    ? "h-12 border-input bg-background px-4 text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-primary"
    : "h-12 border-glass-border bg-field px-4 text-primary-foreground shadow-none placeholder:text-dark-muted focus-visible:ring-primary";
  return (
    <form onSubmit={submit} noValidate className={`space-y-4 ${final ? "text-foreground" : "text-dark-foreground"}`}>
      <div>
        <label htmlFor={`${variant}-name`} className="mb-1.5 block text-xs font-semibold">Nome completo</label>
        <Input id={`${variant}-name`} name="name" autoComplete="name" maxLength={100} className={field} aria-invalid={!!errors["name"]} aria-describedby={errors["name"] ? `${variant}-name-error` : undefined} />
        {errors["name"] && <p id={`${variant}-name-error`} className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor={`${variant}-phone`} className="mb-1.5 block text-xs font-semibold">WhatsApp</label><Input id={`${variant}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(phoneMask(e.target.value))} placeholder="(00) 00000-0000" className={field} aria-invalid={!!errors["phone"]} />{errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}</div>
        <div><label htmlFor={`${variant}-email`} className="mb-1.5 block text-xs font-semibold">E-mail</label><Input id={`${variant}-email`} name="email" type="email" autoComplete="email" maxLength={255} className={field} aria-invalid={!!errors["email"]} />{errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}</div>
      </div>
      {final ? <>
        <div><label htmlFor="final-city" className="mb-1.5 block text-xs font-semibold">Cidade / Estado</label><Input id="final-city" name="city" maxLength={100} className={field} /></div>
        <div><label htmlFor="final-message" className="mb-1.5 block text-xs font-semibold">Conte brevemente o que deseja</label><Textarea id="final-message" name="message" maxLength={800} rows={4} className="border-input bg-background px-4 py-3 text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-primary" /></div>
      </> : <>
        <div><label htmlFor="hero-focus" className="mb-1.5 block text-xs font-semibold">Qual o foco da sua busca?</label><select id="hero-focus" name="focus" defaultValue="" className={`${field} w-full rounded-md border border-input text-sm`} aria-invalid={!!errors["focus"]}><option value="" disabled>Selecione uma opção</option><option>Mobiliário</option><option>Decoração</option><option>Enxoval/Utilidades</option><option>Projeto Completo</option></select>{errors["focus"] && <p className="mt-1 text-xs text-destructive">{errors["focus"]}</p>}</div>
        <fieldset><legend className="mb-2 text-xs font-semibold">Você é?</legend><div className="flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="radio" name="profile" value="cliente" defaultChecked /> Cliente final</label><label className="flex items-center gap-2"><input type="radio" name="profile" value="profissional" /> Arquiteto ou designer</label></div></fieldset>
      </>}
      <label className="flex items-start gap-2 text-xs text-muted-foreground"><input type="checkbox" name="consent" className="mt-0.5 size-4" /> Autorizo o contato sobre catálogo, orçamento e atendimento.</label>
       <Button type="submit" variant="premium" size="touch" className="w-full whitespace-normal" disabled={loading}>{loading ? <LoaderCircle className="animate-spin" /> : <ArrowRight />} {loading ? "Enviando..." : final ? "Enviar e falar com um consultor" : "Baixar Catálogo & Falar com Consultor"}</Button>
      <p className="text-center text-[11px] leading-relaxed text-muted-foreground">Seus dados estão protegidos. Consulte nossa <a href="/politica-de-privacidade" className="underline">Política de Privacidade</a>.</p>
    </form>
  );
}