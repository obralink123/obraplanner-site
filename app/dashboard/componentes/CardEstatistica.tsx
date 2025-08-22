"use client";
import React, { memo, useMemo } from "react";
import Link from "next/link";

type Cor = "azul" | "verde" | "amarelo" | "roxo";
type Formato = "numero" | "moeda" | "texto";

type Variant = "default" | "compact";
type Align = "left" | "right";
type Clickable = { onClick?: () => void; href?: string };

type Props = Clickable & {
  titulo: string;
  valor: number | string;
  cor: Cor;
  /** default: "numero" */
  formato?: Formato;
  /** ícone no topo direito */
  icone?: React.ReactNode;
  /** conteúdo extra (ex.: gráfico) */
  children?: React.ReactNode;
  /** subtítulo/legenda abaixo do título */
  legenda?: string;
  /** variação (ex.: +6% mês) */
  variacao?: string;
  /** se não informar, calcula pelo sinal da variação: + = verde, - = vermelho */
  variacaoCor?: "positivo" | "negativo" | "neutro";
  /** mostra skeleton */
  carregando?: boolean;
  /** reduz paddings/tipografia */
  variant?: Variant;
  /** alinhamento do valor */
  align?: Align;
  /** ação no rodapé (ex.: "ver") */
  acaoLabel?: string;
  onAcaoClick?: () => void;
  /** aria-label custom p/ leitores de tela */
  ariaLabel?: string;
  /** classes extras */
  className?: string;
  /** altura do slot (gráfico) */
  alturaSlotPx?: number;
};

const cores: Record<Cor, { bg: string; ring: string; grad: string }> = {
  azul: {
    bg: "bg-[linear-gradient(180deg,rgba(32,98,182,.18),rgba(8,19,32,.1))]",
    ring: "ring-[rgba(56,143,255,.25)]",
    grad: "from-[#5BA8FF] to-[#2F6FD3]",
  },
  verde: {
    bg: "bg-[linear-gradient(180deg,rgba(34,110,63,.20),rgba(10,27,18,.08))]",
    ring: "ring-[rgba(44,164,94,.28)]",
    grad: "from-[#34D399] to-[#059669]",
  },
  amarelo: {
    bg: "bg-[linear-gradient(180deg,rgba(212,175,55,.20),rgba(70,50,10,.08))]",
    ring: "ring-[rgba(212,175,55,.35)]",
    grad: "from-[#F5D06F] to-[#D4AF37]",
  },
  roxo: {
    bg: "bg-[linear-gradient(180deg,rgba(116,55,190,.20),rgba(28,14,40,.08))]",
    ring: "ring-[rgba(155,81,224,.28)]",
    grad: "from-[#C084FC] to-[#7C3AED]",
  },
};

const nfCache = new Map<string, Intl.NumberFormat>();
function formatar(valor: number | string, formato: Formato, locale = "pt-BR") {
  if (formato === "texto") return String(valor);
  const n = Number(valor);
  if (!nfCache.has(locale + formato)) {
    nfCache.set(
      locale + formato,
      new Intl.NumberFormat(locale, formato === "moeda"
        ? { style: "currency", currency: "BRL", maximumFractionDigits: 0 }
        : { maximumFractionDigits: 0 })
    );
  }
  return nfCache.get(locale + formato)!.format(n);
}

function classeVariação(tipo: "positivo" | "negativo" | "neutro") {
  if (tipo === "positivo") return "text-emerald-400";
  if (tipo === "negativo") return "text-rose-400";
  return "text-white/70";
}

const CardEstatistica = memo(function CardEstatistica({
  titulo,
  valor,
  cor,
  formato = "numero",
  icone,
  children,
  legenda,
  variacao,
  variacaoCor,
  carregando = false,
  variant = "default",
  align = "left",
  acaoLabel,
  onAcaoClick,
  ariaLabel,
  className = "",
  alturaSlotPx = 96,
  onClick,
  href,
}: Props) {
  const c = cores[cor];

  // deduz cor da variação se não informada
  const computedVarCor: "positivo" | "negativo" | "neutro" = useMemo(() => {
    if (!variacao) return "neutro";
    if (variacaoCor) return variacaoCor;
    const isPos = variacao.trim().startsWith("+");
    const isNeg = variacao.trim().startsWith("-");
    return isPos ? "positivo" : isNeg ? "negativo" : "neutro";
  }, [variacao, variacaoCor]);

  const base = [
    "rounded-2xl ring-1 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]",
    c.bg,
    c.ring,
    "flex flex-col",
    variant === "compact" ? "gap-2 p-4" : "gap-3",
    // clipping e performance p/ gráficos
    "relative overflow-hidden [contain:paint]",
    // interações
    (onClick || href) && "cursor-pointer transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Head = (
    <div className="flex items-start justify-between">
      <div className="min-w-0">
        <h3 className={`truncate ${variant === "compact" ? "text-xs" : "text-sm"} font-medium text-white/70`}>
          {titulo}
        </h3>
        {legenda && (
          <p className="text-[11px] text-white/50 mt-0.5 truncate" title={legenda}>
            {legenda}
          </p>
        )}
      </div>
      {icone ?? <div className={`h-8 w-8 rounded-xl bg-gradient-to-b ${c.grad} opacity-90`} />}
    </div>
  );

  const Value = (
    <div className={`flex items-baseline ${align === "right" ? "justify-end" : "justify-start"} gap-2`}>
      <div className={`${variant === "compact" ? "text-2xl" : "text-3xl"} font-extrabold tracking-tight text-white`}>
        {carregando ? <span className="inline-block w-24 h-[1em] rounded bg-white/10 animate-pulse" /> : formatar(valor, formato)}
      </div>
      {!!variacao && !carregando && (
        <div
          className={`inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide ${classeVariação(
            computedVarCor
          )}`}
          aria-label={`Variação: ${variacao}`}
          title={`Variação: ${variacao}`}
        >
          {computedVarCor === "positivo" && <span aria-hidden>▲</span>}
          {computedVarCor === "negativo" && <span aria-hidden>▼</span>}
          {computedVarCor === "neutro" && <span aria-hidden>•</span>}
          {variacao}
        </div>
      )}
    </div>
  );

  const Slot = children ? (
    <div className="relative mt-2 w-full overflow-hidden" style={{ height: alturaSlotPx }}>
      {children}
    </div>
  ) : null;

  const Footer =
    acaoLabel && !carregando ? (
      <div className="mt-2">
        <button
          type="button"
          onClick={onAcaoClick}
          className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        >
          {acaoLabel}
        </button>
      </div>
    ) : null;

  const content = (
    <>
      {Head}
      {Value}
      {Slot}
      {Footer}
    </>
  );

  // suporte a href / onClick mantendo acessibilidade
  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel ?? titulo}
        className={base}
        role="region"
        aria-roledescription="card de estatística"
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={base}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
      aria-label={ariaLabel ?? titulo}
      role="region"
      aria-roledescription="card de estatística"
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {content}
    </div>
  );
});

export default CardEstatistica;
