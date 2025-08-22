// app/dashboard/layout.tsx
import type { ReactNode } from "react";
import CabecalhoDashboard from "./componentes/CabecalhoDashboard";

export const metadata = {
  title: "ObraPlanner — Dashboard",
  description: "Visão geral de obras, orçamentos e atividades.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardContent>{children}</DashboardContent>
  );
}

function DashboardContent({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white">
      {/* fundo com leve vinheta/gradiente */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(212,175,55,0.08),transparent_60%)]" />
      
      {/* Cabeçalho fixo no topo - largura total sem margens */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <CabecalhoDashboard />
      </div>

      {/* Conteúdo com padding-top para compensar o cabeçalho fixo */}
      <div className="pt-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-screen-xl sm:max-w-[1200px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
          {children}
        </div>
      </div>
    </section>
  );
}

