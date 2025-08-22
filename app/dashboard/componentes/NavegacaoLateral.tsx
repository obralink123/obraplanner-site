"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ItemBase {
  id: string;
  nome: string;
  href?: string;
  icone: ReactNode;
  badge?: string | number;
}
interface ItemComFilhos extends ItemBase {
  children: ItemBase[];
}
type ItemNavegacao = ItemBase | ItemComFilhos;

interface PropsNavegacaoLateral {
  colapsado: boolean;
  onToggleColapsado: () => void;
}

const temFilhos = (i: ItemNavegacao): i is ItemComFilhos => "children" in i;

export default function NavegacaoLateral({ colapsado, onToggleColapsado }: PropsNavegacaoLateral) {
  const pathname = usePathname();
  const [mobileAberto, setMobileAberto] = useState(false);
  const [abertos, setAbertos] = useState<Record<string, boolean>>({});

  const isAtivo = (href?: string) =>
    href ? pathname === href || pathname?.startsWith(href) : false;

  useEffect(() => {
    const novos: Record<string, boolean> = {};
    itens.forEach((it) => {
      if (temFilhos(it)) {
        const ativo = it.children.some((c) => c.href && pathname?.startsWith(c.href));
        if (ativo) novos[it.id] = true;
      }
    });
    setAbertos((prev) => ({ ...prev, ...novos }));
  }, [pathname]);

  useEffect(() => {
    setMobileAberto(false);
  }, [pathname]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMobileAberto(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  const itens: ItemNavegacao[] = useMemo(
    () => [
      { id: "inicio", nome: "Dashboard", href: "/dashboard", icone: icone("dashboard") },
      { id: "clientes", nome: "Clientes", href: "/dashboard/clientes", icone: icone("user") },
      { id: "obras", nome: "Obras", href: "/dashboard/obras", icone: icone("layers") },
      { id: "orcamentos", nome: "Orçamentos", href: "/dashboard/orcamentos", icone: icone("file-text") },
      { id: "compras", nome: "Compras", href: "/dashboard/compras", icone: icone("shopping-cart") },
      { id: "cotacoes", nome: "Cotações", href: "/dashboard/cotacoes", icone: icone("list") },
      { id: "contratos", nome: "Contratos", href: "/dashboard/contratos", icone: icone("file") },
      { id: "financeiro", nome: "Financeiro", href: "/dashboard/financeiro", icone: icone("dollar") },
      { id: "diario", nome: "Diário de Obra", href: "/dashboard/diario", icone: icone("message-circle") },
      { id: "relatorios", nome: "Relatórios", href: "/dashboard/relatorios", icone: icone("bar-chart") },
      { id: "configuracoes", nome: "Configurações", href: "/dashboard/configuracoes", icone: icone("settings") },
    ],
    []
  );

  return (
    <>
      <button
        onClick={() => setMobileAberto(true)}
        className="lg:hidden fixed z-50 left-3 top-20 rounded-xl px-3 py-2 bg-[#0B0C10]/80 text-white border border-[#21232a] backdrop-blur"
        aria-label="Abrir menu"
      >
        ☰
      </button>

      {mobileAberto && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileAberto(false)} />
      )}

      <nav
        role="navigation"
        aria-label="Menu lateral"
        className={[
          "fixed top-16 left-0 z-50 h-[calc(100vh-64px)]",
          "bg-[#0B0C10]/80 backdrop-blur-md border-r border-[#21232a]",
          "transition-all duration-300 ease-out overflow-hidden",
          colapsado ? "w-12" : "w-40 lg:w-48",
          mobileAberto ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        ].join(" ")}
      >
        {/* Lista */}
        <div className="px-1.5 py-3 overflow-y-auto h-full">
          <ul className="space-y-0.5">
            {itens.map((item) => {
              const ativo = temFilhos(item)
                ? item.children.some((c) => isAtivo(c.href))
                : isAtivo(item.href);
              const aberto = !!abertos[item.id];
              const toggle = () => setAbertos((s) => ({ ...s, [item.id]: !s[item.id] }));

              const baseCls = [
                "group flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200",
                colapsado ? "justify-center" : "justify-between",
                ativo ? "bg-white/[0.05] text-[#E7C964] border border-[#E7C964]/30" : "text-gray-300 hover:bg-white/[0.05] hover:text-white"
              ].join(" ");

              if (!temFilhos(item)) {
                return (
                  <li key={item.id}>
                    <Link href={item.href ?? "#"} className={baseCls} title={colapsado ? item.nome : undefined}>
                      <span className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 grid place-items-center text-[#E7C964] flex-shrink-0">
                          {item.icone}
                        </span>
                        {!colapsado && (
                          <span className="text-sm font-medium truncate">
                            {item.nome}
                          </span>
                        )}
                      </span>
                      {item.badge && !colapsado && (
                        <span className="px-1.5 py-0.5 text-xs rounded bg-[#E7C964]/20 text-[#E7C964] border border-[#E7C964]/40 flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={baseCls}
                    onClick={!colapsado ? toggle : undefined}
                    aria-expanded={aberto}
                    aria-controls={`submenu-${item.id}`}
                    title={colapsado ? item.nome : undefined}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 grid place-items-center text-gray-400 flex-shrink-0">
                        {item.icone}
                      </span>
                      {!colapsado && (
                        <span className="text-sm font-medium truncate">
                          {item.nome}
                        </span>
                      )}
                    </span>
                    {!colapsado && (
                      <span className={`transition-transform flex-shrink-0 ${aberto ? "rotate-180" : ""}`}>
                        <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    )}
                  </button>
                  {!colapsado && (
                    <div id={`submenu-${item.id}`} className={`overflow-hidden transition-all ${aberto ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                      <ul className="mt-1 ml-6 pl-1 border-l border-white/10 space-y-0.5">
                        {item.children.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={sub.href ?? "#"}
                              className={[
                                "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-sm",
                                isAtivo(sub.href) ? "bg-[#E7C964]/15 text-[#E7C964] border border-[#E7C964]/30" : "text-white/80 hover:bg-white/[0.05]"
                              ].join(" ")}
                            >
                              <span className="truncate">{sub.nome}</span>
                              {sub.badge && (
                                <span className="text-[10px] bg-[#E7C964]/20 text-[#E7C964] px-1.5 py-0.5 rounded-md border border-[#E7C964]/30 flex-shrink-0">
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Botão flutuante de expandir/recolher - sempre visível */}
        <button
          onClick={onToggleColapsado}
          className={[
            "absolute z-[60]",
            colapsado ? "-right-2.5 top-4" : "-right-2.5 top-4",
            "h-7 w-7",
            "items-center justify-center",
            "rounded-full",
            "bg-[#E7C964] text-[#0b0c10]",
            "shadow-xl border border-[#E7C964]/30",
            "hover:bg-[#d7b84f] active:scale-[0.98]",
            "transition-all duration-200",
            "focus:outline-none focus:ring-4 focus:ring-[#E7C964]/25"
          ].join(" ")}
          aria-label={colapsado ? "Expandir menu" : "Recolher menu"}
          title={colapsado ? "Expandir" : "Recolher"}
        >
          {colapsado ? (
            // Colapsado -> mostrar ">" (expandir)
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            // Expandido -> mostrar "<" (recolher)
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </nav>

      {/* Espaço reservado para o conteúdo */}
      <div className={`hidden lg:block transition-all duration-300 ${colapsado ? "w-12" : "w-40 lg:w-48"}`} />
    </>
  );
}

// 🔧 Ícones SVG reutilizáveis
function icone(tipo: string): ReactNode {
  const props = { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24" };
  switch (tipo) {
    case "dashboard":
      return <svg {...props}><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
    case "user":
      return <svg {...props}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.96 1.97 3.45V19h7v-2.5c0-2.33-4.67-3.5-8-3.5z"/></svg>;
    case "layers":
      return <svg {...props}><path d="M4 4h16v2H4V4zm2 4h12v12H6V8zm2 2v8h8v-8H8z"/></svg>;
    case "file-text":
      return <svg {...props}><path d="M4 4h14l2 2v12a2 2 0 0 1-2 2H4V4zm2 4v10h12V8H6zm2 2h8v2H8v-2zm0 4h6v2H8v-2z"/></svg>;
    case "shopping-cart":
      return <svg {...props}><path d="M7 4h10l1 2h3v2H3V6h3l1-2zm-2 6h14l-1.5 9h-11L5 10zm6 2v5h2v-5h-2z"/></svg>;
    case "list":
      return <svg {...props}><path d="M3 6h18v2H3V6zm0 4h12v2H3v-2zm0 4h18v2H3v-2z"/></svg>;
    case "file":
      return <svg {...props}><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6V2zm9 1.5V8h4.5L15 3.5zM8 12h8v2H8v-2zm0 4h6v2H8v-2z"/></svg>;
    case "dollar":
      return <svg {...props}><path d="M3 5h18v2H3V5zm2 4h14v10H5V9zm4 2v6h2v-6H9zm4 0v6h2v-6h-2z"/></svg>;
    case "message-circle":
      return <svg {...props}><path d="M5 3h14a2 2 0 0 1 2 2v13.5a1.5 1.5 0 0 1-2.4 1.2L15 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>;
    case "bar-chart":
      return <svg {...props}><path d="M4 4h16v16H4V4zm4 3h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/></svg>;
    case "settings":
      return <svg {...props}><path d="M19.14 12.94a7.07 7.07 0 0 0 .05-.94 7.07 7.07 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.63l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.94 1h-3.88a.5.5 0 0 0-.49.41l-.36 2.54c-.58.24-1.12.56-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.78 7.97a.5.5 0 0 0 .12.63l2.03 1.58c-.03.31-.05.63-.05.94s.02.63.05.94L2.9 13.64a.5.5 0 0 0-.12.63l1.92 3.32c.14.24.43.34.69.22l2.39-.96c.5.38 1.05.7 1.63.94l.36 2.54c.04.24.25.41.49.41h3.88c.24 0 .45-.17.49-.41l.36-2.54c.58-.24 1.12-.56 1.63-.94l2.39.96c.26.12.55.02.69-.22l1.92-3.32a.5.5 0 0 0-.12-.63l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"/></svg>;
    default:
      return <></>;
  }
}
