"use client";

import { useEffect, useMemo, useState } from "react";
import NavegacaoLateral from "./componentes/NavegacaoLateral";
import CardEstatistica from "./componentes/CardEstatistica";

/** ====== Theme tokens ====== */
const TOKENS = {
  gold: "#E7C964",
  goldDark: "#d7b84f",
  border: "#21232a",
  surface: "#0E1013",
  surface2: "#111318",
  bg: "#0A0A0A",
  sub: "#98a2b3",
} as const;

const clsCard = `rounded-xl bg-[${TOKENS.surface}] border border-[${TOKENS.border}] shadow-[0_10px_30px_rgba(0,0,0,.35)]`;
const clsBtnGhost =
  "px-3 py-1.5 rounded-lg bg-transparent border border-[#21232a] text-white/90 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E7C964]/25 transition";
const clsBtnGold =
  "px-3 py-1.5 rounded-lg text-[#0b0c10] font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E7C964]/25 transition shadow-[0_10px_20px_rgba(231,201,100,0.12)]";
const clsMicro = `p-3 rounded-lg bg-[${TOKENS.surface2}] border border-[${TOKENS.border}] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between`;

export default function DashboardPage() {
  const [colapsado, setColapsado] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; title?: string; body?: string; cta?: string }>({ open: false });
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({ open: false, msg: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && (setShowNotif(false), setModal({ open: false }));
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const toggleColapsado = () => setColapsado((s) => !s);
  const contentShift = colapsado ? "lg:ml-14" : "lg:ml-64 xl:ml-72";

  const acoesRapidas = useMemo(
    () => [
      { id: "obra", titulo: "Criar nova obra", badge: "Novo", desc: "Cadastre uma obra e defina etapas, equipe e cronograma." },
      { id: "orcamento", titulo: "Novo orçamento", badge: "Composições + BDI", desc: "Monte orçamentos com memória de cálculo." },
      { id: "cliente", titulo: "Cadastrar cliente", badge: "CRM", desc: "Adicione clientes e centralize contatos e documentos." },
      { id: "cotacao", titulo: "Nova cotação de materiais", badge: "Excel", desc: "Importe/Exporte listas de materiais." },
      { id: "contrato", titulo: "Emitir contrato", badge: "PDF", desc: "Gere contratos com assinatura digital." },
      { id: "relatorio", titulo: "Gerar relatório PDF", badge: "Resumo", desc: "Crie relatórios claros e compartilhe." },
    ],
    []
  );

  const kpis = useMemo(
    () => [
      { titulo: "Obras ativas", valor: 12, variacao: "+2 esta semana", cor: "verde" as const },
      { titulo: "Orçamentos em andamento", valor: 8, variacao: "+1 hoje", cor: "azul" as const },
      { titulo: "Cotações enviadas", valor: 21, variacao: "em análise", cor: "amarelo" as const },
      { titulo: "Valor total em contratos", valor: 2400000, variacao: "+6% mês", cor: "roxo" as const, formato: "moeda" as const },
    ],
    []
  );

  const alertas = useMemo(
    () => [
      { icone: "⚠️", titulo: "Você tem 3 pedidos aguardando aprovação", subtitulo: "Obra Jardim Europa", a1: "Aprovar", a2: "Ver", cor: "#f59e0b" },
      { icone: "📝", titulo: "Assinatura pendente em 1 contrato", subtitulo: "Cliente: Construtora Alpha", a1: "Enviar lembrete", a2: "Abrir", cor: TOKENS.gold },
    ],
    []
  );

  const atalhos = useMemo(
    () => [
      { titulo: "Orçamento", subtitulo: "PDF" },
      { titulo: "Lista de Materiais", subtitulo: "Excel" },
      { titulo: "Contrato", subtitulo: "PDF" },
      { titulo: "Diário de Obra", subtitulo: "Registrar" },
    ],
    []
  );

  const resumoHoje = useMemo(
    () => [
      { label: "Tarefas concluídas", valor: "14" },
      { label: "Pedidos aprovados", valor: "5" },
      { label: "Novos clientes", valor: "2" },
      { label: "Orçamentos criados", valor: "8" },
      { label: "Contratos emitidos", valor: "3" },
    ],
    []
  );

  const proximasAcoes = useMemo(
    () => [
      { titulo: "Criar orçamento para Obra 102", acao: "Iniciar" },
      { titulo: "Enviar cotação de concreto", acao: "Enviar" },
      { titulo: "Emitir contrato do cliente Beta", acao: "Emitir" },
      { titulo: "Aprovar pedido de materiais", acao: "Aprovar" },
    ],
    []
  );

  const openModal = (title: string, body: string, cta = "Confirmar") =>
    setModal({ open: true, title, body, cta });
  const closeModal = () => setModal({ open: false });
  const fireToast = (msg: string) => {
    setToast({ open: true, msg });
    setTimeout(() => setToast({ open: false, msg: "" }), 2600);
  };

  // Componente de gráfico SVG reutilizável
  const GraficoLinha = ({ cor }: { cor: string }) => (
    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`gradient-${cor}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${cor}30`} />
          <stop offset="100%" stopColor={`${cor}05`} />
        </linearGradient>
      </defs>
      <path 
        d="M10,35 L20,32 L30,30 L40,28 L50,26 L60,24 L70,22 L80,20 L90,18 L90,40 L10,40 Z"
        fill={`url(#gradient-${cor})`}
      />
      <path 
        d="M10,35 L20,32 L30,30 L40,28 L50,26 L60,24 L70,22 L80,20 L90,18"
        stroke={cor}
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen" style={{ background: TOKENS.bg, color: "#e5e7eb" }}>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 px-3 py-2 rounded bg-black text-white">
        Pular para o conteúdo
      </a>

      <NavegacaoLateral colapsado={colapsado} onToggleColapsado={toggleColapsado} />

      {/* wrapper que acompanha o sidebar */}
      <div className={`transition-[margin] duration-300 ${contentShift}`}>
        {/* conteúdo */}
        <main
          id="conteudo"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 10%, rgba(231,201,100,0.09), transparent 60%)",
          }}
        >
          <section className="mx-auto max-w-screen-xl sm:max-w-[1200px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
            {/* título / CTAs - mais compacto */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
              <div className="flex-1">
                <h1 className="font-['Manrope',Inter] text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  Bem-vindo ao ObraPlanner, Samuel!
                  <span className="text-white/80 font-medium block sm:inline">
                    {" "}O que vamos gerenciar hoje?
                  </span>
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border border-[#21232a] bg-white/[0.04]">
                    Versão Prova
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full border border-[#21232a] bg-white/[0.04] flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full" style={{ background: TOKENS.gold }} />
                    7 dias restantes
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={clsBtnGhost} aria-label="Abrir guia rápido">📚 Guia rápido</button>
                <button
                  className={`${clsBtnGold}`}
                  style={{ background: TOKENS.gold }}
                  onClick={() => openModal("Ação rápida", "Selecione uma ação para continuar", "Iniciar")}
                  aria-label="Abrir ações rápidas"
                >
                  ⚡ Ação rápida
                </button>
              </div>
            </div>

            {/* ações rápidas - grid mais denso */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
              {acoesRapidas.map((a) => (
                <button
                  key={a.id}
                  onClick={() => openModal(a.titulo, `Formulário para ${a.titulo}`)}
                  className={`${clsCard} p-3 text-left hover:-translate-y-0.5 transition-transform duration-300`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">{a.titulo}</div>
                    {a.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                          a.badge === "Novo" ? "text-[#0b0c10]" : "text-white/80 border border-[#21232a]"
                        }`}
                        style={a.badge === "Novo" ? { background: TOKENS.gold } : {}}
                      >
                        {a.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: TOKENS.sub }}>
                    {a.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* KPIs com gráficos - mais compactos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {kpis.map((kpi, index) => (
                <CardEstatistica 
                  key={index}
                  titulo={kpi.titulo} 
                  valor={kpi.valor} 
                  cor={kpi.cor}
                  formato={kpi.formato}
                  variacao={kpi.variacao}
                >
                  <GraficoLinha 
                    cor={
                      kpi.cor === "verde" ? "#34D399" :
                      kpi.cor === "azul" ? "#5BA8FF" :
                      kpi.cor === "amarelo" ? "#F5D06F" :
                      "#C084FC"
                    } 
                  />
                </CardEstatistica>
              ))}
            </div>

            {/* Layout principal - mais denso */}
            <div className="grid xl:grid-cols-4 gap-3 mb-8">
              {/* Alertas - ocupando 2 colunas */}
              <div className="xl:col-span-2">
                <section className={`${clsCard} p-4`} aria-labelledby="tit-alertas">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔔</span>
                      <h2 id="tit-alertas" className="font-['Manrope',Inter] text-white font-bold text-base">Alertas rápidos</h2>
                    </div>
                    <button className={clsBtnGhost}>Ver todos</button>
                  </div>

                  <div className="space-y-2">
                    {alertas.length === 0 && (
                      <div className={`p-4 rounded-lg bg-[${TOKENS.surface2}] border border-[${TOKENS.border}] text-sm`} style={{ color: TOKENS.sub }}>
                        Nenhum alerta no momento. Tudo sob controle ✅
                      </div>
                    )}

                    {alertas.map((a, i) => (
                      <div key={i} className={`p-3 rounded-lg bg-[${TOKENS.surface2}] border border-[${TOKENS.border}] flex items-start gap-3`}>
                        <span className="mt-0.5" style={{ color: a.cor }}>{a.icone}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white truncate">{a.titulo}</div>
                          <div className="text-xs" style={{ color: TOKENS.sub }}>{a.subtitulo}</div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            className="text-xs px-2 py-1 rounded-lg"
                            style={{ background: TOKENS.gold, color: "#0b0c10" }}
                            onClick={() => fireToast("Aprovado (demo)")}
                          >
                            {a.a1}
                          </button>
                          <button className={`${clsBtnGhost} text-xs px-2 py-1`} onClick={() => openModal(a.titulo, "Detalhes (demo)", "Abrir")}>
                            {a.a2}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Resumo de hoje - ocupando 1 coluna */}
              <div className="xl:col-span-1">
                <section className={`${clsCard} p-4`} aria-labelledby="tit-resumo">
                  <div className="flex items-center justify-between mb-3">
                    <h2 id="tit-resumo" className="font-['Manrope',Inter] text-white font-bold text-base">Resumo de hoje</h2>
                    <span className="text-xs px-1.5 py-0.5 rounded-md border border-[#21232a] bg-white/[0.04]">Agora</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    {resumoHoje.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span style={{ color: TOKENS.sub }}>{it.label}</span>
                        <span className="text-white font-semibold">{it.valor}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`h-[80px] w-full rounded-lg bg-[${TOKENS.surface2}] border border-[${TOKENS.border}] p-2 relative overflow-hidden [contain:paint]`}>
                    <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full">
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(231,201,100,0.45)" />
                          <stop offset="100%" stopColor="rgba(231,201,100,0.0)" />
                        </linearGradient>
                      </defs>
                      <path d="M0,34 10,30 20,28 30,24 40,20 50,18 60,16 70,13 80,10 90,8 100,6 L100,40 0,40Z" fill="url(#g1)" />
                      <polyline points="0,34 10,30 20,28 30,24 40,20 50,18 60,16 70,13 80,10 90,8 100,6" stroke="rgba(231,201,100,0.9)" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </section>
              </div>

              {/* Próximas ações - ocupando 1 coluna */}
              <div className="xl:col-span-1">
                <section className={`${clsCard} p-4`} aria-labelledby="tit-proximas">
                  <h2 id="tit-proximas" className="font-['Manrope',Inter] text-white font-bold text-base mb-3">Próximas ações</h2>
                  <div className="space-y-2">
                    {proximasAcoes.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => openModal(a.titulo, `Executar: ${a.titulo}`, a.acao)}
                        className={`w-full text-left p-2 rounded-lg bg-[${TOKENS.surface2}] border border-[${TOKENS.border}] hover:bg-white/[0.05] transition-colors duration-200 flex items-center justify-between`}
                      >
                        <span className="text-xs truncate">{a.titulo}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-md flex-shrink-0" style={{ background: TOKENS.gold, color: "#0b0c10" }}>
                          {a.acao}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Atalhos de geração - grid mais denso */}
            <section className={`${clsCard} p-4 mb-6`} aria-labelledby="tit-atalhos">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🧭</span>
                <h2 id="tit-atalhos" className="font-['Manrope',Inter] text-white font-bold text-base">Atalhos de geração</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                {atalhos.map((a, i) => (
                  <button key={i} onClick={() => openModal(a.titulo, `Gerar ${a.titulo}`)} className={clsMicro} aria-label={`Gerar ${a.titulo}`}>
                    <div className="min-w-0">
                      <div className="text-xs text-white truncate">{a.titulo}</div>
                      <div className="text-[10px]" style={{ color: TOKENS.sub }}>{a.subtitulo}</div>
                    </div>
                    <span className="text-sm flex-shrink-0">➡️</span>
                  </button>
                ))}
              </div>
            </section>

            {/* rodapé - mais compacto */}
            <footer className="py-6 text-center text-xs" style={{ color: TOKENS.sub }}>
              © 2025 ObraPlanner. Todos os direitos reservados.
            </footer>
          </section>
        </main>

        {/* modal */}
        {modal.open && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
            <div className={`${clsCard} w-full max-w-lg overflow-hidden rounded-2xl`}>
              <div className="p-4 border-b border-[#21232a] flex items-start justify-between">
                <div>
                  <div className="font-['Manrope',Inter] text-white font-bold text-lg">{modal.title}</div>
                  <div className="text-xs" style={{ color: TOKENS.sub }}>
                    Demonstração visual — conecte com seu backend.
                  </div>
                </div>
                <button onClick={closeModal} className={clsBtnGhost} aria-label="Fechar modal">
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-sm text-white mb-1">Campo de exemplo</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg bg-[#0F1115] border border-[#21232a] text-white placeholder-[#98a2b3] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E7C964]/25"
                    placeholder="Digite aqui..."
                  />
                </div>
              </div>
              <div className="p-3 border-t border-[#21232a] flex items-center justify-end gap-2">
                <button onClick={closeModal} className={clsBtnGhost}>Cancelar</button>
                <button
                  onClick={() => { fireToast(`${modal.title} concluído (demo)`); closeModal(); }}
                  className={clsBtnGold}
                  style={{ background: TOKENS.gold }}
                >
                  {modal.cta ?? "Confirmar"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* toast */}
        {toast.open && (
          <div
            className="fixed bottom-4 right-4 z-[60] rounded-xl px-3 py-2 text-sm flex items-center gap-2"
            role="status"
            aria-live="polite"
            style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
          >
            <span>✅</span>
            <span>{toast.msg}</span>
            <button onClick={() => setToast({ open: false, msg: "" })} className={`${clsBtnGhost} ml-1 text-xs px-1.5 py-0.5`}>
              Fechar
            </button>
          </div>
        )}
      </div>

      {/* reduz animações para quem prefere */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
