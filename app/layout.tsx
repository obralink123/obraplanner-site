// app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  title: "ObraPlanner — Gestão sem lacunas para construtoras",
  description:
    "ObraPlanner: software premium de gestão de obras. Orçamentos, compras, contratos, financeiro e relatórios em um só lugar. 7 dias grátis, sem cartão.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* fontes do HTML original */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Manrope:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* classes de selection iguais ao HTML */}
      <body className="selection:bg-yellow-200 selection:text-black">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
