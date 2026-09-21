import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  useEffect(() => { setVisible(!window.localStorage.getItem("cbo-cookie-consent")); }, []);
  const decide = (value: "accepted" | "essential") => { window.localStorage.setItem("cbo-cookie-consent", value); setVisible(false); };
  if (!visible) return null;
  return <aside aria-label="Preferências de cookies" className="glass-panel fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-lg p-4 sm:p-5">
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3">
      <Cookie className="mt-0.5 size-5 shrink-0 text-primary" />
      <div className="min-w-0"><p className="text-sm font-bold">Sua privacidade importa</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Usamos apenas cookies essenciais para lembrar suas escolhas. Cookies analíticos só serão ativados com sua autorização.</p>{manage && <label className="mt-3 flex items-center gap-2 text-xs"><input type="checkbox" disabled /> Cookies analíticos (ainda não utilizados)</label>}</div>
      <button onClick={() => setVisible(false)} className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-muted" aria-label="Fechar aviso"><X className="size-4" /></button>
    </div>
    <div className="mt-4 flex flex-wrap gap-2 pl-8"><Button size="sm" variant="premium" onClick={() => decide("accepted")}>Aceitar</Button><Button size="sm" variant="outline" onClick={() => decide("essential")}>Recusar</Button><Button size="sm" variant="ghost" onClick={() => setManage(!manage)}>Gerenciar preferências</Button><a href="/politica-de-cookies" className="self-center text-xs underline">Política de Cookies</a></div>
  </aside>;
}