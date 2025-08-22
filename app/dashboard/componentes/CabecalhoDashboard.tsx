"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth'

export default function CabecalhoDashboard() {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [notificacoesAberto, setNotificacoesAberto] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificacoesRef = useRef<HTMLDivElement>(null);
  const notifBtnRef = useRef<HTMLButtonElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const pesquisaRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, signOut } = useAuth()

  const iniciais = useMemo(() => {
    if (!user?.nome) return 'U'
    return user.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
  }, [user?.nome]);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownAberto(false);
      }
      if (notificacoesRef.current && !notificacoesRef.current.contains(event.target as Node)) {
        setNotificacoesAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fechar dropdowns com ESC e atalho de pesquisa
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownAberto(false);
        setNotificacoesAberto(false);
      }
      // Atalho Cmd+K (ou Ctrl+K no Windows) para focar na pesquisa
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        pesquisaRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      {/* Wordmark */}
      <div
        className="text-2xl sm:text-3xl font-extrabold leading-none text-white"
        style={{
          background: 'linear-gradient(to bottom, #8A6D1D 0%, #D4AF37 22%, #F5D06F 38%, #D4AF37 56%, #B8870A 78%, #6E5212 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'
        }}
      >
        ObraPlanner
      </div>

      {/* Barra de Pesquisa */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className={`h-5 w-5 transition-colors ${
                termoPesquisa ? "text-[#E7C964]" : "text-white/70"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            ref={pesquisaRef}
            type="text"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Pesquisar..."
            className="block w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E7C964]/25 focus:border-[#E7C964]/50 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      {/* Notificações + Perfil */}
      <div className="flex items-center gap-3">
        {/* Botão de Notificações */}
        <div className="relative">
          <button
            ref={notifBtnRef}
            type="button"
            onClick={() => setNotificacoesAberto((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={notificacoesAberto}
            aria-controls="menu-notificacoes"
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E7C964]/25 transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v4.5l2.25 2.25a1.5 1.5 0 0 1-1.5 2.25h-13.5a1.5 1.5 0 0 1-1.5-2.25L6 14.25V9.75a6 6 0 0 1 6-6z" />
            </svg>
            {/* Badge de notificações não lidas */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {notificacoesAberto && (
            <div
              id="menu-notificacoes"
              role="menu"
              ref={notifMenuRef}
              className="absolute right-0 mt-2 w-80 rounded-xl border border-[#21232a] bg-[#0E1013] shadow-[0_10px_30px_rgba(0,0,0,.35)] overflow-hidden z-50"
            >
              {/* Header das notificações */}
              <div className="p-4 border-b border-[#21232a] flex items-center justify-between">
                <h3 className="text-white font-semibold">Notificações</h3>
                <button
                  onClick={() => setNotificacoesAberto(false)}
                  className="text-white/60 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {/* Lista de notificações */}
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-[#21232a] hover:bg-white/5 transition cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium">Nova obra iniciada</p>
                      <p className="text-white/60 text-xs mt-1">Obra "Residencial São Paulo" foi iniciada hoje</p>
                      <p className="text-white/40 text-xs mt-1">Há 2 horas</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-b border-[#21232a] hover:bg-white/5 transition cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium">Orçamento aprovado</p>
                      <p className="text-white/60 text-xs mt-1">Orçamento #1234 foi aprovado pelo cliente</p>
                      <p className="text-white/40 text-xs mt-1">Há 4 horas</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-b border-[#21232a] hover:bg-white/5 transition cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium">Material em estoque baixo</p>
                      <p className="text-white/60 text-xs mt-1">Cimento está com estoque abaixo do mínimo</p>
                      <p className="text-white/40 text-xs mt-1">Há 1 dia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-[#21232a]">
                <button
                  onClick={() => setNotificacoesAberto(false)}
                  className="w-full text-center text-[#E7C964] text-sm font-medium hover:text-[#d7b84f] transition"
                >
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Perfil + Menu */}
        <div className="relative">
          <button
            ref={btnRef}
            type="button"
            onClick={() => setDropdownAberto((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={dropdownAberto}
            aria-controls="menu-usuario"
            className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E7C964]/25 transition"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#0b0c10] font-semibold text-sm bg-gradient-to-br from-[#E7C964] to-[#d7b84f]">
              {iniciais[0]}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-white">{user?.nome}</div>
              {user?.email && (
                <div className="text-xs text-white/60">{user.email}</div>
              )}
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="hidden md:block opacity-80"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownAberto && (
            <div
              id="menu-usuario"
              role="menu"
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 rounded-xl border border-[#21232a] bg-[#0E1013] shadow-[0_10px_30px_rgba(0,0,0,.35)] overflow-hidden"
            >
              {/* header do menu */}
              <div className="p-4 border-b border-[#21232a] flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#E7C964] to-[#d7b84f] grid place-items-center text-[#0b0c10] font-bold">
                  {iniciais}
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold truncate">{user?.nome}</div>
                  {user?.email && (
                    <div className="text-[12px] text-white/60 truncate">{user.email}</div>
                  )}
                </div>
              </div>

              {/* opções */}
              <div className="p-2">
                <button
                  role="menuitem"
                  onClick={() => {
                    setDropdownAberto(false);
                    router.push("/dashboard/configuracoes?tab=preferencias");
                  }}
                  className="w-full text-left p-3 rounded-lg bg-[#111318] border border-[#21232a] hover:bg-white/5 transition flex items-center gap-2"
                >
                  <span>⚙️</span>
                  <span className="text-white">Preferências</span>
                </button>

                <button
                  role="menuitem"
                  onClick={() => {
                    setDropdownAberto(false);
                    router.push("/dashboard/configuracoes?tab=seguranca");
                  }}
                  className="mt-2 w-full text-left p-3 rounded-lg bg-[#111318] border border-[#21232a] hover:bg-white/5 transition flex items-center gap-2"
                >
                  <span>🔒</span>
                  <span className="text-white">Segurança</span>
                </button>

                <button
                  role="menuitem"
                  onClick={handleSignOut}
                  className="mt-2 w-full text-left p-3 rounded-lg bg-[#111318] border border-[#21232a] hover:bg-white/5 transition flex items-center gap-2"
                >
                  <span>🚪</span>
                  <span className="text-white">Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
