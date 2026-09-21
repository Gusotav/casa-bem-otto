import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  useEffect(() => { setVisible(!window.localStorage.getItem("cbo-cookie-consent")); }, []);
  const decide = (value: "accepted" | "essential") => { window.localStorage.setItem("cbo-cookie-consent", value); setVisible(false); };
  if (!visible) return null;
  return <aside aria-label="Preferências de cookies" className="dark-glass fixed inset-x-2 bottom-2 z-[70] mx-auto max-w-3xl p-3 text-dark-foreground sm:inset-x-3 sm:bottom-3 sm:p-5">
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3">
      <Cookie className="mt-0.5 hidden size-5 shrink-0 text-primary sm:block" />
       <div className="min-w-0"><p className="text-sm font-bold">Sua privacidade importa</p><p className="mt-1 text-[11px] leading-relaxed text-dark-muted sm:text-xs">Usamos cookies essenciais para lembrar escolhas. Os analíticos só serão ativados com autorização.</p>{manage && <label className="mt-3 flex items-center gap-2 text-xs"><input type="checkbox" disabled /> Cookies analíticos (ainda não utilizados)</label>}</div>
      <Button variant="ghost" size="icon" onClick={() => setVisible(false)} className="size-8 shrink-0" aria-label="Fechar aviso"><X className="size-4" /></Button>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:pl-8"><Button size="sm" variant="premium" onClick={() => decide("accepted")}>Aceitar</Button><Button size="sm" variant="glassDark" onClick={() => decide("essential")}>Recusar</Button><Button size="sm" variant="ghost" className="col-span-2 hover:bg-primary-soft hover:text-primary" onClick={() => setManage(!manage)}>Gerenciar preferências</Button><a href="/politica-de-cookies" className="col-span-2 self-center text-center text-[11px] underline sm:text-xs">Política de Cookies</a></div>
  </aside>;
}