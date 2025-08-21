"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [hideProofBar, setHideProofBar] = useState(false);

  useEffect(() => {
    // ====== scripts do HTML original, 1:1 ======

    // Ano
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    // Menu mobile
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const toggleMenu = () => mobileMenu?.classList.toggle("hidden");
    menuBtn?.addEventListener("click", toggleMenu);
    mobileMenu
      ?.querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", () => mobileMenu.classList.add("hidden")));

    // Reveal ao rolar
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => io.observe(el));

    // Progress bars
    const pio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const pct = el.getAttribute("data-progress") || "100";
            el.style.width = pct + "%";
            pio.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll<HTMLElement>(".progress").forEach((el) => {
      el.style.width = "0%";
      pio.observe(el);
    });

    // Sticky CTA
    const stickyCta = document.getElementById("stickyCta");
    let stickyShown = false;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = y + windowHeight;
      
      // Mostra quando rola para baixo (após 520px)
      if (y > 520 && !stickyShown && scrollPosition < documentHeight - 100) {
        stickyCta?.classList.add("show");
        stickyShown = true;
      }
      
      // Esconde quando volta para o topo (< 300px) ou chega no final da página
      if (y < 300 && stickyShown) {
        stickyCta?.classList.remove("show");
        stickyShown = false;
      }
      
      // Esconde quando chega no final da página (últimos 100px)
      if (scrollPosition >= documentHeight - 100 && stickyShown) {
        stickyCta?.classList.remove("show");
        stickyShown = false;
      }
    };
    window.addEventListener("scroll", onScroll);

    // Controle da proofBar (desktop)
    const handleProofBarScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottom = document.documentElement.scrollHeight;

      // se estiver no final da página (últimos 100px), oculta
      if (scrollPosition >= bottom - 100) {
        setHideProofBar(true);
      } else {
        setHideProofBar(false);
      }
    };

    window.addEventListener("scroll", handleProofBarScroll);

    // Helpers modais
    const openModal = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove("hidden");
      el.classList.add("flex");
    };
    const closeModal = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.add("hidden");
      el.classList.remove("flex");
    };

    // Demo modal
    const demoModal = document.getElementById("demoModal");
    const btnDemo = document.getElementById("btnDemo");
    const closeDemo = document.getElementById("closeDemo");
    const demoForm = document.getElementById("demoForm") as HTMLFormElement | null;
    const demoSuccess = document.getElementById("demoSuccess");
    btnDemo?.addEventListener("click", () => openModal(demoModal));
    document.getElementById("stickyDemo")?.addEventListener("click", () => openModal(demoModal));
    document.getElementById("barDemo")?.addEventListener("click", () => openModal(demoModal));
    closeDemo?.addEventListener("click", () => closeModal(demoModal));
    demoModal?.addEventListener("click", (e) => {
      if (e.target === demoModal) closeModal(demoModal);
    });
    demoForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      demoSuccess?.classList.remove("hidden");
      setTimeout(() => closeModal(demoModal), 1400);
    });

    // Trial modal
    const trialModal = document.getElementById("trialModal");
    const closeTrial = document.getElementById("closeTrial");
    const trialForm = document.getElementById("trialForm") as HTMLFormElement | null;
    const trialSuccess = document.getElementById("trialSuccess");
    const openTrial = () => openModal(trialModal);
    [
      "heroTrial",
      "btnHeaderTrial",
      "btnMobileTrial",
      "stickyStart",
      "barTrial",
      "primaryStart",
      "compareStart",
      "btnStartTrial",
    ].forEach((id) => document.getElementById(id)?.addEventListener("click", openTrial));
    closeTrial?.addEventListener("click", () => closeModal(trialModal));
    trialModal?.addEventListener("click", (e) => {
      if (e.target === trialModal) closeModal(trialModal);
    });
    trialForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      trialSuccess?.classList.remove("hidden");
      setTimeout(() => closeModal(trialModal), 1400);
    });

    // Whats plano
    document.getElementById("btnPlanWhats")?.addEventListener("click", () =>
      window.open(
        "https://wa.me/53991196695?text=Ol%C3%A1!%20Vim%20pelo%20site%20ObraPlanner.%20Quero%20saber%20mais%20sobre%20o%20software.",
        "_blank",
        "noopener"
      )
    );

    // Login modal
    const loginModal = document.getElementById("loginModal");
    const btnLoginHeader = document.getElementById("btnLoginHeader");
    const btnLoginMobile = document.getElementById("btnLoginMobile");
    const closeLogin = document.getElementById("closeLogin");
    const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
    const loginSuccess = document.getElementById("loginSuccess");
    const openLogin = () => openModal(loginModal);
    const closeLoginModal = () => closeModal(loginModal);
    btnLoginHeader?.addEventListener("click", (e) => {
      e.preventDefault();
      openLogin();
    });
    btnLoginMobile?.addEventListener("click", (e) => {
      e.preventDefault();
      openLogin();
    });
    closeLogin?.addEventListener("click", closeLoginModal);
    loginModal?.addEventListener("click", (e) => {
      if (e.target === loginModal) closeLoginModal();
    });
    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      loginSuccess?.classList.remove("hidden");
      setTimeout(() => {
        window.open("https://app.obraplanner.com/login", "_blank", "noopener");
        closeLoginModal();
      }, 1000);
    });

    // FAQ toggle
    document.querySelectorAll<HTMLElement>("#faq .faq-item").forEach((item) => {
      const btn = item.querySelector("button")!;
      const ans = item.querySelector(".faq-answer") as HTMLElement | null;
      const icon = item.querySelector("svg") as SVGSVGElement | null;
      btn.addEventListener("click", () => {
        const wasOpen = ans ? !ans.classList.contains("hidden") : false;
        
        // Fecha todos os itens primeiro
        document
          .querySelectorAll<HTMLElement>("#faq .faq-answer")
          .forEach((x) => x.classList.add("hidden"));
        document
          .querySelectorAll<SVGSVGElement>("#faq .faq-item svg")
          .forEach((s) => (s.style.transform = "rotate(0deg)"));
        
        // Se o item clicado não estava aberto, abre ele
        if (!wasOpen) {
          ans?.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
        // Se já estava aberto, permanece fechado (permitindo recolher)
      });
    });

    // Carrossel depoimentos
    const slides = document.getElementById("slides") as HTMLElement | null;
    // pega só os dots dos depoimentos (evita colidir com os dots dos PDFs)
    const dots = Array.from(document.querySelectorAll<HTMLButtonElement>(".testi-dot"));
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    let idx = 0;
    const go = (i: number) => {
      if (!slides) return;
      idx = (i + dots.length) % dots.length;
      slides.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("active", di === idx));
    };
    dots.forEach((d, di) => d.addEventListener("click", () => go(di)));
    prev?.addEventListener("click", () => go(idx - 1));
    next?.addEventListener("click", () => go(idx + 1));
    go(0);
    let auto = setInterval(() => go(idx + 1), 5000);
    slides?.addEventListener("mouseenter", () => clearInterval(auto));
    slides?.addEventListener("mouseleave", () => (auto = setInterval(() => go(idx + 1), 5000)));

    // Carrossel dos PDFs (banner)
    const pdfSlides = document.getElementById("pdfSlides") as HTMLElement | null;
    const pdfDots = Array.from(document.querySelectorAll<HTMLButtonElement>(".pdf-dot"));
    const pdfPrev = document.getElementById("pdfPrev");
    const pdfNext = document.getElementById("pdfNext");
    let pidx = 0;
    
    console.log("PDF Dots encontrados:", pdfDots.length);

    const pgo = (i: number) => {
      if (!pdfSlides || pdfDots.length === 0) return;
      pidx = (i + pdfDots.length) % pdfDots.length;
      pdfSlides.style.transform = `translateX(-${pidx * 100}%)`;
      pdfDots.forEach((d, di) => d.classList.toggle("active", di === pidx));
    };

    pdfDots.forEach((d, di) => d.addEventListener("click", () => pgo(di)));
    pdfPrev?.addEventListener("click", () => pgo(pidx - 1));
    pdfNext?.addEventListener("click", () => pgo(pidx + 1));

    pgo(0);
    let pAuto = setInterval(() => pgo(pidx + 1), 4500);
    pdfSlides?.addEventListener("mouseenter", () => clearInterval(pAuto));
    pdfSlides?.addEventListener("mouseleave", () => (pAuto = setInterval(() => pgo(pidx + 1), 4500)));

    // ESC fecha modais
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        [demoModal, trialModal, loginModal].forEach((m) => m && closeModal(m as HTMLElement));
      }
    };
    document.addEventListener("keydown", onEsc);

    // cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", handleProofBarScroll);
      document.removeEventListener("keydown", onEsc);
      menuBtn?.removeEventListener("click", toggleMenu);
      clearInterval(auto);   // <- depoimentos
      clearInterval(pAuto);  // <- PDFs
    };
  }, []);

  return (
    <>
      {/* ===== estilos globais 1:1 do HTML ===== */}
      <style jsx global>{`
        :root {
          --gold: #d4af37;
          --gold-2: #f5d06f;
          --emerald: #38a169;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: Inter, Manrope, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
            'Helvetica Neue', Arial;
          background: radial-gradient(1200px 500px at 90% -20%, rgba(212, 175, 55, 0.08), transparent 60%),
            radial-gradient(900px 400px at -10% 10%, rgba(245, 208, 111, 0.06), transparent 60%),
            linear-gradient(180deg, #000 0%, #0a0a0b 100%);
          color: #e5e5e5;
        }
        .text-gold {
          color: var(--gold-2);
        }
        .border-gold {
          border-color: rgba(212, 175, 55, 0.28);
        }
        .card {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(212, 175, 55, 0.22);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px) saturate(1.25);
          -webkit-backdrop-filter: blur(12px) saturate(1.25);
          transition: transform 0.22s ease, box-shadow 0.28s ease, border-color 0.22s ease,
            filter 0.22s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 175, 55, 0.36);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 12px 28px rgba(245, 208, 111, 0.1);
          filter: saturate(1.03);
        }
        .btn-gold {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-2) 100%);
          color: #0b0b0c;
          font-weight: 800;
          letter-spacing: 0.2px;
          box-shadow: 0 16px 34px rgba(245, 208, 111, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.65);
          transition: transform 0.2s ease, box-shadow 0.25s ease, filter 0.22s ease;
        }
        .btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 22px 50px rgba(245, 208, 111, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);
          filter: saturate(1.08);
        }
        .btn-outline-gold {
          border: 1px solid var(--gold);
          color: var(--gold-2);
          background: rgba(212, 175, 55, 0.02);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.22s ease,
            color 0.18s ease;
        }
        .btn-outline-gold:hover {
          background: rgba(212, 175, 55, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(245, 208, 111, 0.22);
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.45rem 0.7rem;
          border: 1px solid rgba(212, 175, 55, 0.28);
          border-radius: 999px;
          background: rgba(212, 175, 55, 0.06);
          color: var(--gold-2);
          font-weight: 600;
          font-size: 12px;
        }
        .gold-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(212, 175, 55, 0.45),
            transparent
          );
        }
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-glow {
          position: absolute;
          inset: -10% -20% auto -20%;
          height: 70%;
          background: radial-gradient(
              700px 280px at 20% 0%,
              rgba(245, 208, 111, 0.08),
              transparent 60%
            ),
            radial-gradient(
              600px 240px at 80% 10%,
              rgba(245, 208, 111, 0.06),
              transparent 60%
            );
          pointer-events: none;
          z-index: 0;
        }
        .progress {
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(212, 175, 55, 0.18),
            rgba(245, 208, 111, 0.5)
          );
        }
        .sticky-cta {
          position: fixed;
          left: 0;
          right: 0;
          bottom: calc(max(12px, env(safe-area-inset-bottom, 0px)));
          z-index: 50;
          transform: translateY(140%);
          transition: transform 0.3s ease;
        }
        .sticky-cta.show {
          transform: translateY(0);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #2a2a2a;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .dot.active {
          background: var(--gold-2);
        }
        a,
        button {
          outline: none;
        }
        a:focus-visible,
        button:focus-visible {
          outline: 0;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.65), 0 0 0 4px rgba(0, 0, 0, 0.8);
          border-radius: 12px;
        }
        button:active {
          transform: translateY(0);
          filter: saturate(1.02);
        }
        [aria-disabled="true"],
        [data-loading="true"] {
          opacity: 0.7;
          pointer-events: none;
        }
        @keyframes pop {
          0% {
            transform: scale(0.96);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop {
          animation: pop 0.15s ease-out both;
        }
        .faq-item.open > button {
          background: rgba(255, 255, 255, 0.03);
        }
        .faq-item > button {
          width: 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
        
        /* Breakpoints customizados para melhor responsividade */
        @media (min-width: 475px) {
          .xs\:w-\[320px\] {
            width: 320px;
          }
        }
        
        /* Otimizações para mobile */
        @media (max-width: 640px) {
          .card {
            padding: 1rem;
          }
          
          .btn-gold, .btn-outline-gold {
            font-size: 0.875rem;
            padding: 0.75rem 1rem;
          }
          
          /* Garantir que não haja overflow horizontal */
          body {
            overflow-x: hidden !important;
            width: 100% !important;
            max-width: 100vw !important;
          }
          
          /* Ajustar containers para mobile */
          .max-w-7xl {
            max-width: 100% !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          /* Prevenir elementos de ultrapassarem a tela */
          * {
            max-width: 100% !important;
          }
          
          /* Garantir que botões não se dupliquem visualmente */
          .btn-outline-gold, .btn-gold {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
        .device {
          width: 340px;
          max-width: 95vw;
          border-radius: 28px;
          padding: 14px;
          background: radial-gradient(
              100% 100% at 0% 0%,
              rgba(245, 208, 111, 0.08),
              rgba(245, 208, 111, 0.02) 40%,
              transparent 70%
            ),
            #0e0e11;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.02), 0 30px 60px rgba(0, 0, 0, 0.55);
          position: relative;
        }
        .device:before {
          content: "";
          position: absolute;
          left: 50%;
          top: 8px;
          transform: translateX(-50%);
          width: 110px;
          height: 6px;
          border-radius: 6px;
          background: #1c1c22;
        }
      `}</style>

      {/* ======= HEADER NASA-GRADE ======= */}
      <header className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-black/90 via-black/80 to-black/70 backdrop-blur-2xl border-b border-[rgba(212,175,55,0.12)] shadow-2xl shadow-black/50 transition-all duration-500">
        {/* Glow effect at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo NASA-Grade */}
          <a href="#" className="flex items-center gap-2 group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.1)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="flex items-center gap-1 relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">
              <span className="text-gold font-extrabold text-xl sm:text-2xl tracking-tight" style={{
                background: 'linear-gradient(to bottom, #8A6D1D 0%, #D4AF37 22%, #F5D06F 38%, #D4AF37 56%, #B8870A 78%, #7A5C16 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                ObraPlanner
              </span>
              <span className="text-xs sm:text-sm font-bold" style={{
                background: 'linear-gradient(to bottom, #6E5212 0%, #B8870A 22%, #D4AF37 42%, #D4AF37 52%, #8A6D1D 78%, #5A3F0F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
              }}>
                ™
              </span>
            </div>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110"></div>
          </a>

          {/* Desktop Navigation NASA-Grade */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <a href="#recursos" className="text-neutral-300 hover:text-gold font-medium transition-all duration-300 relative group py-2">
              <span className="relative z-10">Recursos</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-[#f5d06f] to-gold group-hover:w-full transition-all duration-500 ease-out"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a href="#como-funciona" className="text-neutral-300 hover:text-gold font-medium transition-all duration-300 relative group py-2">
              <span className="relative z-10">Como Funciona</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-[#f5d06f] to-gold group-hover:w-full transition-all duration-500 ease-out"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a href="#clientes" className="text-neutral-300 hover:text-gold font-medium transition-all duration-300 relative group py-2">
              <span className="relative z-10">Clientes</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-[#f5d06f] to-gold group-hover:w-full transition-all duration-500 ease-out"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a href="#planos" className="text-neutral-300 hover:text-gold font-medium transition-all duration-300 relative group py-2">
              <span className="relative z-10">Planos</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-[#f5d06f] to-gold group-hover:w-full transition-all duration-500 ease-out"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a href="#faq" className="text-neutral-300 hover:text-gold font-medium transition-all duration-300 relative group py-2">
              <span className="relative z-10">FAQ</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-[#f5d06f] to-gold group-hover:w-full transition-all duration-500 ease-out"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </nav>

          {/* Desktop Actions NASA-Grade */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              id="btnLoginHeader" 
              href="https://app.obraplanner.com/login" 
              target="_blank" 
              rel="noopener" 
              className="text-neutral-300 hover:text-gold font-semibold text-sm transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-[rgba(212,175,55,0.05)]"
            >
              <span className="relative z-10">Entrar</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.4)] to-transparent shadow-[0_0_4px_rgba(212,175,55,0.3)]"></div>
            <button 
              id="btnHeaderTrial" 
              className="btn-gold rounded-lg px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Teste grátis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <a 
              href="https://wa.me/53991196695?text=Ol%C3%A1!%20Vim%20pelo%20site%20ObraPlanner.%20Quero%20saber%20mais%20sobre%20o%20software." 
              target="_blank" 
              rel="noopener" 
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[rgba(212,175,55,0.3)] text-green-400 hover:text-green-300 hover:border-[rgba(212,175,55,0.6)] hover:bg-[rgba(212,175,55,0.08)] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 relative group"
              aria-label="Falar no WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(34,197,94,0.1)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Mobile Menu Button NASA-Grade */}
          <button 
            id="menuBtn" 
            aria-label="Abrir menu" 
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[rgba(212,175,55,0.3)] text-gold hover:bg-[rgba(212,175,55,0.08)] hover:border-[rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20 relative group"
          >
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Mobile Menu NASA-Grade */}
        <div id="mobileMenu" className="hidden lg:hidden bg-gradient-to-b from-black/98 to-black/95 backdrop-blur-2xl border-t border-[rgba(212,175,55,0.12)] shadow-2xl">
          <div className="px-4 py-6 space-y-2">
            <a href="#recursos" className="block px-4 py-3 rounded-lg hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300 font-medium group relative">
              <span className="relative z-10">Recursos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#como-funciona" className="block px-4 py-3 rounded-lg hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300 font-medium group relative">
              <span className="relative z-10">Como Funciona</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#clientes" className="block px-4 py-3 rounded-lg hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300 font-medium group relative">
              <span className="relative z-10">Clientes</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#planos" className="block px-4 py-3 rounded-lg hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300 font-medium group relative">
              <span className="relative z-10">Planos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#faq" className="block px-4 py-3 rounded-lg hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300 font-medium group relative">
              <span className="relative z-10">FAQ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <div className="border-t border-[rgba(212,175,55,0.15)] my-4 shadow-[0_0_4px_rgba(212,175,55,0.1)]"></div>
            <a id="btnLoginMobile" href="https://app.obraplanner.com/login" target="_blank" rel="noopener" className="block px-4 py-3 rounded-lg hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300 font-medium group relative">
              <span className="relative z-10">Entrar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <button id="btnMobileTrial" className="w-full btn-gold rounded-lg px-4 py-3 text-sm font-semibold mt-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">Teste grátis</button>
            <a 
              href="https://wa.me/53991196695?text=Ol%C3%A1!%20Vim%20pelo%20site%20ObraPlanner.%20Quero%20saber%20mais%20sobre%20o%20software." 
              target="_blank" 
              rel="noopener" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[rgba(34,197,94,0.05)] text-green-400 transition-all duration-300 font-medium group relative"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="relative z-10">Falar no WhatsApp</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(34,197,94,0.05)] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </header>

      {/* Sticky Mobile CTA */}
      <div id="stickyCta" className="sticky-cta mx-2 sm:mx-3 md:hidden">
        <div className="card rounded-2xl px-2 sm:px-3 md:px-4 py-3 flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.12)] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" className="text-[var(--emerald)] sm:w-4 sm:h-4"><path fill="currentColor" d="M9 16.17 4.83 12 3.4 13.41 9 19l12-12-1.41-1.41z"/></svg>
            </div>
              <div className="text-[11px] sm:text-[12px]">
              <div className="font-bold">Teste grátis em 60s</div>
              <div className="text-neutral-400">7 dias • Sem cartão</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button id="stickyStart" className="btn-gold rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm">Começar</button>
            <button id="stickyDemo" className="btn-outline-gold rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm">Ver em ação</button>
          </div>
        </div>
      </div>

      {/* ======= MAIN ======= */}
      <main className="relative">
        <div className="hero-glow" />

        {/* Hero */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 relative overflow-hidden min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
            {/* Esquerda */}
            <div className="reveal">
              <span className="badge">
                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="m9 16.2-3.5-3.5l-1.4 1.4L9 19l10-10l-1.4-1.4z"/></svg>
                Software premium para construtoras
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] sm:leading-[1.05] tracking-tight mt-4">
                <span className="text-neutral-100">Gestão sem lacunas.</span>
                <span className="block bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent">Mais previsibilidade, mais margem, mais obras fechadas.</span>
              </h1>
              <p className="mt-4 text-neutral-300/90 text-sm sm:text-base md:text-[1.05rem] leading-relaxed tracking-[0.01em]">
                Centralize orçamentos, compras, contratos, diário de obra e financeiro. Propostas padronizadas, aprovações rápidas e números confiáveis em tempo real.
              </p>
              <ul className="mt-4 text-neutral-300 text-xs sm:text-sm space-y-1">
                <li className="inline-flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" className="text-[var(--emerald)]"><path fill="currentColor" d="M9 16.17 4.83 12 3.4 13.41 9 19l12-12-1.41-1.41z"/></svg> Feche propostas 2x mais rápido com modelos e assinatura</li>
                <li className="inline-flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" className="text-[var(--emerald)]"><path fill="currentColor" d="M9 16.17 4.83 12 3.4 13.41 9 19l12-12-1.41-1.41z"/></svg> Custos, compras e aprovações em tempo real</li>
                <li className="inline-flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" className="text-[var(--emerald)]"><path fill="currentColor" d="M9 16.17 4.83 12 3.4 13.41 9 19l12-12-1.41-1.41z"/></svg> Relatórios premium em PDF e Excel com sua marca</li>
              </ul>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button id="heroTrial" className="btn-gold rounded-xl px-6 sm:px-7 py-3 font-semibold shadow-lg focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[rgba(212,175,55,0.6)] active:translate-y-0" aria-label="Iniciar teste grátis em 60 segundos" data-loading="false">Teste grátis em 60s</button>
                <button id="btnDemo" className="btn-outline-gold rounded-xl px-6 sm:px-7 py-3 font-semibold">Ver em ação</button>
                <a href="https://wa.me/53991196695?text=Ol%C3%A1!%20Vim%20pelo%20site%20ObraPlanner.%20Quero%20saber%20mais%20sobre%20o%20software." target="_blank" rel="noopener" className="btn-outline-gold rounded-xl px-6 sm:px-7 py-3 font-semibold">Falar no WhatsApp</a>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] text-neutral-400">
                <div className="col-span-2 sm:col-span-4 flex items-center justify-center gap-3 text-neutral-400">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.06)]"><svg width="14" height="14" viewBox="0 0 24 24" className="text-gold"><path fill="currentColor" d="M12 2 2 7v10l10 5 10-5V7Z"/></svg> Segurança e privacidade</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.06)]"><svg width="14" height="14" viewBox="0 0 24 24" className="text-gold"><path fill="currentColor" d="m9 16.2-3.5-3.5l-1.4 1.4L9 19l10-10l-1.4-1.4z"/></svg> Confiado por equipes</span>
                </div>
                <div className="card rounded-xl px-3 py-2 flex items-center gap-2 animate-pop" aria-label="Mais de 1.200 profissionais usam o ObraPlanner"><span className="bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent font-extrabold">1.200+</span> profissionais</div>
                <div className="card rounded-xl px-3 py-2 flex items-center gap-2"><span className="bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent font-semibold">Segurança</span> de dados</div>
                <div className="card rounded-xl px-3 py-2 flex items-center gap-2"><span className="bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent font-semibold">Suporte</span> humano</div>
                <div className="card rounded-xl px-3 py-2 flex items-center gap-2"><span className="bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent font-semibold">Relatórios</span> premium</div>
              </div>
            </div>

            {/* Direita (PDFs – carrossel) */}
            <div className="reveal lg:justify-self-end">
              <div className="relative">
                {/* brilho atrás */}
                <div
                  className="absolute -inset-6 rounded-3xl blur-2xl opacity-50"
                  style={{
                    background:
                      "radial-gradient(500px 260px at 30% 30%, rgba(245,208,111,0.22), transparent 55%), radial-gradient(480px 240px at 70% 70%, rgba(212,175,55,0.16), transparent 55%)",
                  }}
                />

                {/* frame do banner */}
                <div className="relative card rounded-3xl mx-auto w-[280px] xs:w-[320px] sm:w-[380px] max-w-[90vw] aspect-[3/4] overflow-hidden ring-1 ring-[rgba(212,175,55,0.18)]">
                  {/* slides */}
                  <div id="pdfSlides" className="flex h-full transition-transform duration-500">
                    {[
                      { src: "/pdfs/orcamento.png", alt: "PDF de Orçamento" },
                      { src: "/pdfs/relatorio.jpg", alt: "PDF de Relatório" },
                      { src: "/pdfs/contrato.png", alt: "PDF de Contrato" },
                      { src: "/pdfs/comparativo.png", alt: "Comparativo de Preços" },
                      { src: "/pdfs/materiais.png", alt: "Gestão de Materiais" },
                    ].map((p) => (
                      <div key={p.src} className="min-w-full h-full flex items-center justify-center bg-[#0f0f12]">
                        {/* pode trocar por <Image> se preferir */}
                        <img
                          src={p.src}
                          alt={p.alt}
                          className="w-full h-full object-contain"
                          loading="eager"
                          onError={(e) => {
                            console.error("Erro ao carregar imagem:", p.src);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log("Imagem carregada com sucesso:", p.src);
                          }}
                        />
                        </div>
                    ))}
                      </div>

                  {/* controles */}
                  <button
                    id="pdfPrev"
                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 btn-outline-gold rounded-full w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center text-sm sm:text-base"
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    id="pdfNext"
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 btn-outline-gold rounded-full w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center text-sm sm:text-base"
                    aria-label="Próximo"
                  >
                    ›
                  </button>
                    </div>

                {/* dots */}
                <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3" role="tablist" aria-label="Navegar PDFs">
                  <button className="dot pdf-dot" role="tab" aria-label="Orçamento" />
                  <button className="dot pdf-dot" role="tab" aria-label="Relatório" />
                  <button className="dot pdf-dot" role="tab" aria-label="Contrato" />
                  <button className="dot pdf-dot" role="tab" aria-label="Comparativo de Preços" />
                  <button className="dot pdf-dot" role="tab" aria-label="Materiais" />
                        </div>

                <div className="mt-4 text-center text-neutral-400 text-xs sm:text-sm px-2">
                  Exemplos de documentos gerados automaticamente (Orçamento, Relatório, Contrato, Comparativo de Preços e Materiais)
                        </div>
                        </div>
                      </div>
                      </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* Provas rápidas */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            <div className="card rounded-xl p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-3 md:gap-4 reveal hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent font-bold text-sm sm:text-base md:text-lg">1.200+</span>
                <div className="text-xs sm:text-sm text-neutral-400">profissionais usando</div>
                        </div>
              <div className="card rounded-xl p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-3 md:gap-4 reveal hover:scale-105 transition-transform duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gold sm:w-5 sm:h-5"><path fill="currentColor" d="M12 2 2 7v10l10 5 10-5V7L12 2z"/></svg>
                <div className="text-xs sm:text-sm text-neutral-400">segurança e privacidade</div>
                        </div>
              <div className="card rounded-xl p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-3 md:gap-4 reveal hover:scale-105 transition-transform duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gold sm:w-5 sm:h-5"><path fill="currentColor" d="M3 3h18v2H3zM3 7h12v2H3zM3 11h18v2H3zM3 15h10v2H3zM3 19h18v2H3z"/></svg>
                <div className="text-xs sm:text-sm text-neutral-400">relatórios premium</div>
                      </div>
              <div className="card rounded-xl p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-3 md:gap-4 reveal hover:scale-105 transition-transform duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gold sm:w-5 sm:h-5"><path fill="currentColor" d="M12 17a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm6-9h2V6h-2V4h-2v2h-2v2h2v2h2zM8 9H4V7h4V5h2v2h4v2H10v2H8z"/></svg>
                <div className="text-xs sm:text-sm text-neutral-400">suporte humano</div>
                      </div>
                    </div>
                  </div>
          <div className="mt-8 gold-line" />
        </section>

        {/* Benefícios */}
        <section id="recursos" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Benefícios principais</h2>
              <p className="text-neutral-400 mt-4 text-lg">Organize tudo em um lugar e ganhe eficiência real no dia a dia.</p>
                </div>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                ["M3 3h18v2H3V3Zm2 4h14v2H5V7Zm-2 4h10v2H3v-2Zm0 4h18v2H3v-2Zm2 4h8v2H5v-2Z", "Orçamentos profissionais em minutos", "Modelos com margens e impostos. Envio com assinatura."],
                ["M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm-7 9a7 7 0 0 1 14 0Z", "Clientes e fornecedores unificados", "Cadastros com histórico, tarefas e contatos."],
                ["M2 7h20v2H2Zm0 4h14v2H2Zm0 4h20v2H2Z", "Compras e cotações centralizadas", "Compare preços, aprove e emita pedidos."],
                ["M21 7H3V5h18v2Zm0 4H3v2h18v-2Zm0 6H3v2h18v-2Z", "Relatórios PDF e Excel premium", "Documentos com sua marca, prontos para envio."],
                ["M19 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z", "Diário de obra e contratos", "Registros e contratos automáticos por obra."],
                ["M3 3h18v2H3zM3 7h10v2H3zM3 11h18v2H3zM3 15h14v2H3zM3 19h18v2H3z", "Financeiro com gráficos", "Fluxo de caixa, DRE simplificado e exportação."],
              ].map(([d, h, p], i) => (
                <div key={i} className="card rounded-2xl p-8 reveal hover:scale-105 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-xl bg-[rgba(212,175,55,0.12)] border border-gold flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold"><path fill="currentColor" d={String(d)} /></svg>
              </div>
                  <h3 className="font-bold text-lg mb-3">{h}</h3>
                  <p className="text-neutral-400 text-base leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* Comparativo */}
        <section id="comparativo" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Planilhas x ObraPlanner</h2>
              <p className="text-neutral-400 mt-4 text-lg">Veja o que você elimina e o que ganha ao migrar.</p>
            </div>
            <div className="mt-16 grid lg:grid-cols-2 gap-10">
              <div className="card rounded-2xl p-8 reveal ring-1 ring-black/30 hover:scale-105 transition-transform duration-300">
                <div className="text-neutral-300 font-bold text-lg mb-4">Planilhas e grupos</div>
                <ul className="space-y-3 text-base text-neutral-400">
                  {[
                    "Versões divergentes e retrabalho",
                    "Custos sem visibilidade",
                    "Aprovações soltas e atrasos",
                    "Relatórios manuais demorados",
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-amber-300">•</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card rounded-2xl p-8 border border-gold reveal hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent font-extrabold text-xl mb-4">ObraPlanner</div>
                <ul className="space-y-3 text-base text-neutral-300">
                  {[
                    "Propostas padronizadas com assinatura",
                    "Custos e compras em tempo real",
                    "Aprovações com histórico",
                    "Relatórios com sua marca",
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" className="text-[var(--emerald)]"><path fill="currentColor" d="M9 16.17 4.83 12 3.4 13.41 9 19l12-12-1.41-1.41z"/></svg> {t}
                      {i === 3 && <span className="ml-2 text-[10px] px-2 py-[2px] rounded-md border border-white/10 bg-white/5">PDF / Excel</span>}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <button className="btn-gold rounded-xl px-5 py-3 font-semibold" id="compareStart">Começar agora grátis</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Como funciona</h2>
              <p className="text-neutral-400 mt-4 text-lg">Em 15 minutos: conta criada, primeiro orçamento enviado e time alinhado.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                ["1", "Cadastre sua empresa", "Logotipo, dados fiscais e preferências.", "60"],
                ["2", "Crie seu primeiro orçamento", "Use modelos, itens e listas de materiais.", "85"],
                ["3", "Acompanhe custos e aprovações", "Tudo em tempo real, com status e notificações.", "100"],
              ].map(([n, h, p, pr], i) => (
                <div key={i} className="card rounded-2xl p-8 reveal ring-1 ring-black/30 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.12)] border border-gold flex items-center justify-center">
                      <span className="font-bold bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent text-lg">{n}</span>
                    </div>
                    <h3 className="font-bold text-lg">{h}</h3>
                  </div>
                  <p className="text-neutral-400 text-base leading-relaxed mb-4">{p}</p>
                  <div className="progress" data-progress={pr} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Quem usa, recomenda</h2>
              <p className="text-neutral-400 mt-4 text-lg">Casos reais de empresas que aumentaram previsibilidade e margem.</p>
            </div>

            <div className="mt-8 relative reveal">
              <div id="carousel" className="overflow-hidden rounded-2xl" role="region" aria-label="Depoimentos de clientes">
                <div id="slides" className="flex transition-transform duration-500">
                  {[
                    { emoji: "🏗️", nome: "Marina Souza", cargo: "Eng. Civil • Alfa Obras", txt: "“Padronizei orçamentos e reduzi 40% do tempo de proposta. Acompanhar custos em tempo real foi o diferencial.”" },
                    { emoji: "🧱", nome: "Rafael Lima", cargo: "Diretor • Prime Obras", txt: "“Compras e cotações centralizadas deram previsibilidade de caixa. Fecho mais rápido e com margem protegida.”" },
                    { emoji: "📐", nome: "Carla Nogueira", cargo: "Sócia • Edifica+", txt: "“Relatórios com nossa marca elevam a percepção do cliente. Suporte é rápido e humano.”" },
                  ].map((s, i) => (
                    <div key={i} className="min-w-full p-4">
                      <div className="card rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                                                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[rgba(212,175,55,0.25)] ring-1 ring-[rgba(212,175,55,0.2)] relative">
                            <img 
                              src={i === 0 ? "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=150&h=150&fit=crop&crop=face&auto=format&q=80" : i === 1 ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80" : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80"}
                              data-fallback-attempts="0" 
                              alt={`Foto de ${s.nome}`}
                              className="w-full h-full object-cover"
                              onLoad={(e) => {
                                // Esconde o loading quando a imagem carrega
                                const target = e.target as HTMLImageElement;
                                const loadingElement = target.parentElement?.querySelector('.loading-indicator') as HTMLElement;
                                if (loadingElement) loadingElement.style.display = 'none';
                              }}
                              onError={(e) => {
                                // Fallback para URLs alternativas caso a primeira falhe
                                const target = e.target as HTMLImageElement;
                                const fallbackUrls = [
                                  "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80", 
                                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                                ];
                                
                                // Se já tentou todas as URLs, mostra o fallback com inicial
                                if (target.dataset.fallbackAttempts === '2') {
                                  target.style.display = 'none';
                                  const nextSibling = target.nextSibling as HTMLElement;
                                  if (nextSibling) nextSibling.style.display = 'flex';
                                } else {
                                  // Tenta próxima URL de fallback
                                  const attempts = parseInt(target.dataset.fallbackAttempts || '0') + 1;
                                  target.dataset.fallbackAttempts = attempts.toString();
                                  target.src = fallbackUrls[attempts - 1];
                                }
                              }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-[rgba(212,175,55,0.15)] to-[rgba(212,175,55,0.08)] flex items-center justify-center text-lg font-bold text-gold" style={{display: 'none'}}>
                              {s.nome.split(' ')[0].charAt(0)}
                            </div>
                            <div className="loading-indicator absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.1)] to-[rgba(212,175,55,0.05)] flex items-center justify-center">
                              <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">{s.nome}</div>
                            <div className="text-xs text-neutral-400">{s.cargo}</div>
                          </div>
                        </div>
                        <p className="text-sm text-neutral-300">{s.txt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Controls */}
              <button id="prev" className="absolute -left-2 top-1/2 -translate-y-1/2 btn-outline-gold rounded-full w-9 h-9 hidden sm:inline-flex items-center justify-center" aria-label="Anterior">
                ‹
              </button>
              <button id="next" className="absolute -right-2 top-1/2 -translate-y-1/2 btn-outline-gold rounded-full w-9 h-9 hidden sm:inline-flex items-center justify-center">
                ›
              </button>
                                <div className="mt-4 flex items-center justify-center gap-3" role="tablist" aria-label="Navegar depoimentos">
                    <button className="dot testi-dot" data-dot="0" role="tab" aria-label="Depoimento 1" />
                    <button className="dot testi-dot" data-dot="1" role="tab" aria-label="Depoimento 2" />
                    <button className="dot testi-dot" data-dot="2" role="tab" aria-label="Depoimento 3" />
                  </div>
            </div>
          </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* Logos clientes */}
        <section id="clientes" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Clientes e parceiros</h2>
              <p className="text-neutral-400 mt-4 text-lg">Confiança de empresas que entregam obras com excelência.</p>
            </div>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 reveal">
              {["Construtora Alfa", "Grupo Beta", "Prime Obras", "Edifica+", "Construsmart", "ObraFácil"].map((t) => (
                <div key={t} className="card rounded-xl py-4 text-center text-neutral-300">{t}</div>
              ))}
            </div>
          </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* Plano */}
        <section id="planos" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Plano único. Tudo incluso.</h2>
              <p className="text-neutral-400 mt-4 text-lg">Preço direto, sem surpresas. Teste agora e ative quando fizer sentido.</p>
            </div>

            <div className="mt-8 reveal">
              <div className="card lightning-card rounded-3xl p-6 sm:p-10 relative overflow-hidden ring-1 ring-[rgba(212,175,55,0.25)]">
                {/* Elementos do efeito de relâmpago */}
                <div className="lightning-residual"></div>
                <div className="lightning-vibration"></div>
                <div className="lightning-border"></div>
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(212,175,55,0.36)] bg-[rgba(212,175,55,0.1)] bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent text-sm font-semibold mb-3">
                      <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 3 5 6 .9-4.3 4.2 1 6-5.7-3-5.7 3 1-6L3 7.9 9 7z"/></svg> Plano Premium
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="text-4xl font-extrabold bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent">R$49,90</div>
                      <div className="text-neutral-400 mb-1">/mês</div>
                    </div>
                    <p className="text-neutral-300 mt-2">7 dias grátis • Sem cartão • Cancelamento em 1 clique. Satisfação garantida.</p>
                    <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-neutral-300">
                      {[
                        "Orçamentos e contratos",
                        "Cotações e compras",
                        "PDF e Excel premium",
                        "Diário de obra",
                        "Financeiro com gráficos",
                        "Suporte prioritário",
                      ].map((t) => (
                        <li key={t} className="inline-flex items-center gap-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" className="text-[var(--emerald)]"><path fill="currentColor" d="M9 16.17 4.83 12 3.4 13.41 9 19l12-12-1.41-1.41z"/></svg> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full max-w-sm">
                    <div className="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-black/30 p-5">
                      <p className="text-sm text-neutral-400 mb-3">Comece sem custo:</p>
                      <button id="primaryStart" className="btn-gold w-full rounded-xl px-5 py-3 font-semibold">Começar Teste Grátis</button>
                      <button id="btnPlanWhats" className="btn-outline-gold w-full mt-2 rounded-xl px-5 py-3 font-semibold">Falar no WhatsApp</button>
                      <p className="text-[11px] text-neutral-500 mt-3">Demo visual. Sem processamento real de pagamento.</p>
                    </div>
                    <button className="btn-gold w-full mt-3 rounded-xl px-5 py-3 font-semibold" id="secondaryStart">Começar agora</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center reveal">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Perguntas frequentes</h2>
              <p className="text-neutral-400 mt-4 text-lg">Tudo claro, sem pegadinhas.</p>
            </div>

            <div className="mt-8 rounded-2xl border border-[rgba(212,175,55,0.18)] bg-black/20 overflow-hidden reveal">
              {[
                ["Posso cancelar quando quiser?", "Sim, sem multa. O cancelamento é imediato."],
                ["O teste grátis pede cartão?", "Não, sem cartão. Experimente à vontade por 7 dias."],
                ["Posso importar meus dados?", "Sim, por planilhas. Fornecemos modelos e suporte."],
                ["Como é o suporte?", "Suporte humano por WhatsApp e e-mail, com prioridade para clientes ativos."],
              ].map(([q, a], i) => (
                <div key={i} className={`faq-item ${i < 3 ? "border-b border-[rgba(212,175,55,0.12)]" : ""} transition-colors`}>
                  <button className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between">
                    <span className="font-semibold">{q}</span>
                    <svg className="w-5 h-5 text-gold transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                  </button>
                  <div className="faq-answer px-5 sm:px-6 pb-4 text-neutral-300 hidden">{a}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 gold-line" />
        </section>

        {/* CTA Final */}
        <section id="cta-final" className="py-20 sm:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-4xl sm:text-6xl font-extrabold tracking-tight reveal">Pronto para organizar sua obra com previsibilidade?</h3>
            <p className="text-neutral-400 mt-4 text-lg reveal">Crie sua conta gratuita e envie seu primeiro orçamento em minutos.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center reveal">
              <button id="btnStartTrial" className="btn-gold rounded-xl px-6 py-3 font-semibold">Começar agora grátis</button>
                              <a target="_blank" rel="noopener" href="https://wa.me/53991196695?text=Ol%C3%A1!%20Vim%20pelo%20site%20ObraPlanner.%20Quero%20saber%20mais%20sobre%20o%20software." className="btn-outline-gold rounded-xl px-6 py-3 font-semibold">Falar no WhatsApp</a>
            </div>
            <p className="text-[12px] text-neutral-500 mt-3">Demo visual. Nenhum dado é enviado.</p>
          </div>
        </section>

        {/* Prova social sticky (desktop) */}
        {!hideProofBar && (
          <div id="proofBar" className="hidden md:block fixed bottom-0 left-0 right-0 z-30">
            <div className="max-w-5xl mx-auto mb-3">
              <div className="card rounded-2xl px-5 py-3 flex items-center justify-between gap-4 bg-black/70">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-[var(--emerald)]"><path fill="currentColor" d="M9 16.17 4.83 12 3.4 13.41 9 19l12-12-1.41-1.41z"/></svg>
                  Profissionais em todo o Brasil usando o ObraPlanner. 7 dias grátis • Sem cartão.
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-outline-gold rounded-lg px-4 py-2 text-sm" id="barDemo">Ver demonstração</button>
                  <button className="btn-gold rounded-lg px-4 py-2 text-sm" id="barTrial">Começar teste</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[rgba(212,175,55,0.12)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold bg-gradient-to-b from-[#8A6D1D] via-[#D4AF37] via-[#F5D06F] via-[#D4AF37] to-[#7A5C16] bg-clip-text text-transparent">ObraPlanner</span>
            <span className="text-neutral-500 text-sm">© <span id="year" /></span>
          </div>
          <div className="text-neutral-500 text-sm">Projeto demonstrativo para fins de apresentação.</div>
        </div>
      </footer>

      {/* ===== Modais ===== */}
      {/* Demo */}
      <div id="demoModal" className="fixed inset-0 hidden items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative w-[92%] max-w-lg card rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-bold">Ver em ação</h4>
              <p className="text-neutral-400 text-sm mt-1">Deixe seus dados e retornaremos em breve (simulação).</p>
            </div>
            <button id="closeDemo" className="btn-outline-gold rounded-md px-2 py-1">Fechar</button>
          </div>
          <form id="demoForm" className="mt-5 space-y-3">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Nome</label>
              <input required type="text" className="w-full rounded-lg bg-black/30 border border-[rgba(212,175,55,0.25)] px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.35)]" placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">E-mail</label>
              <input required type="email" className="w-full rounded-lg bg-black/30 border border-[rgba(212,175,55,0.25)] px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.35)]" placeholder="voce@empresa.com" />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">WhatsApp</label>
              <input type="tel" className="w-full rounded-lg bg-black/30 border border-[rgba(212,175,55,0.25)] px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.35)]" placeholder="(00) 00000-0000" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Demo visual. Os dados não são enviados.</span>
              <button className="btn-gold rounded-lg px-4 py-2 font-semibold">Solicitar</button>
            </div>
          </form>
          <div id="demoSuccess" className="hidden mt-4 text-[var(--emerald)] text-sm">Perfeito! Recebemos sua solicitação (simulação).</div>
        </div>
      </div>

      {/* Trial */}
      <div id="trialModal" className="fixed inset-0 hidden items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative w-[92%] max-w-lg card rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-bold">Começar teste grátis</h4>
              <p className="text-neutral-400 text-sm mt-1">Sem cartão • 7 dias.</p>
            </div>
            <button id="closeTrial" className="btn-outline-gold rounded-md px-2 py-1">Fechar</button>
          </div>
          <form id="trialForm" className="mt-5 space-y-3">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Nome da empresa</label>
              <input required type="text" className="w-full rounded-lg bg-black/30 border border-[rgba(212,175,55,0.25)] px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.35)]" placeholder="Minha Construtora LTDA" />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Seu e-mail</label>
              <input required type="email" className="w-full rounded-lg bg-black/30 border border-[rgba(212,175,55,0.25)] px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.35)]" placeholder="voce@empresa.com" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Demo visual. Nenhum dado será enviado.</span>
              <button className="btn-gold rounded-lg px-4 py-2 font-semibold">Criar conta demo</button>
            </div>
          </form>
          <div id="trialSuccess" className="hidden mt-4 text-[var(--emerald)] text-sm">Conta demo criada (simulação)! Aproveite seus 7 dias.</div>
        </div>
      </div>

      {/* Login */}
      <div id="loginModal" className="fixed inset-0 hidden items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative w-[92%] max-w-md card rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-bold">Entrar no ObraPlanner</h4>
              <p className="text-neutral-400 text-sm mt-1">Acesse sua conta para continuar suas obras.</p>
            </div>
            <button id="closeLogin" className="btn-outline-gold rounded-md px-2 py-1">Fechar</button>
          </div>
          <form id="loginForm" className="mt-5 space-y-3">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">E-mail</label>
              <input required type="email" className="w-full rounded-lg bg-black/30 border border-[rgba(212,175,55,0.25)] px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.35)]" placeholder="voce@empresa.com" />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Senha</label>
              <input required type="password" className="w-full rounded-lg bg-black/30 border border-[rgba(212,175,55,0.25)] px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.35)]" placeholder="Sua senha" />
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-300">
                <input type="checkbox" className="accent-yellow-300" /> Lembrar-me
              </label>
              <button className="btn-gold rounded-lg px-4 py-2 font-semibold">Entrar</button>
            </div>
            <div className="text-sm text-neutral-400">
              Esqueceu a senha?{" "}
              <a id="forgotLink" href="https://app.obraplanner.com/login" target="_blank" rel="noopener" className="text-gold hover:underline">Recuperar acesso</a>
            </div>
          </form>
          <div id="loginSuccess" className="hidden mt-4 text-[var(--emerald)] text-sm">Login simulado! Redirecionando…</div>
        </div>
      </div>
    </>
  );
}
