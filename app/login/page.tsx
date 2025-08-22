'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [nome, setNome] = useState('')
  const [empresa, setEmpresa] = useState('')
  
  const { signIn, signUp, loading, error, user } = useAuth()
  const router = useRouter()

  // Função para voltar à página anterior
  const handleVoltar = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      router.push('/')
    }
  }

  // Adicionar listener para tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleVoltar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Se já estiver logado, mostra mensagem e botão para ir ao dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Botão Voltar */}
          <div className="mb-6">
            <button
              onClick={handleVoltar}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="text-4xl font-extrabold leading-none text-white mb-2"
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
            <p className="text-white/60">Gerencie suas obras com eficiência</p>
          </div>

          {/* Card de Usuário Logado */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E7C964] to-[#d7b84f] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0b0c10]">
                  {user.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Bem-vindo de volta, {user.nome}!
              </h2>
              
              <p className="text-white/60 mb-6">
                Você já está logado. Clique no botão abaixo para acessar seu dashboard.
              </p>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#E7C964] to-[#d7b84f] text-[#0b0c10] font-semibold rounded-lg hover:from-[#d7b84f] hover:to-[#c4a73f] focus:outline-none focus:ring-2 focus:ring-[#E7C964]/25 transition-all"
              >
                Ir para o Dashboard
              </button>

              <div className="mt-4">
                <Link href="/" className="text-[#E7C964] hover:text-[#d7b84f] text-sm transition-colors">
                  ← Voltar para a página inicial
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2024 ObraPlanner. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSignUp) {
      const result = await signUp(email, password, nome, empresa)
      if (!result.error) {
        // Aguardar um pouco para o usuário ser criado
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      }
    } else {
      const result = await signIn(email, password)
      if (!result.error) {
        router.push('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Botão Voltar */}
        <div className="mb-6">
          <button
            onClick={handleVoltar}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="text-4xl font-extrabold leading-none text-white mb-2"
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
          <p className="text-white/60">Gerencie suas obras com eficiência</p>
        </div>

        {/* Card de Login */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isSignUp ? 'Criar Conta' : 'Entrar'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-white/80 mb-2">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required={isSignUp}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E7C964]/25 focus:border-[#E7C964]/50 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-white/80 mb-2">
                    Empresa (opcional)
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E7C964]/25 focus:border-[#E7C964]/50 transition-all"
                    placeholder="Nome da sua empresa"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E7C964]/25 focus:border-[#E7C964]/50 transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E7C964]/25 focus:border-[#E7C964]/50 transition-all"
                placeholder="Sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#E7C964] to-[#d7b84f] text-[#0b0c10] font-semibold rounded-lg hover:from-[#d7b84f] hover:to-[#c4a73f] focus:outline-none focus:ring-2 focus:ring-[#E7C964]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Carregando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#E7C964] hover:text-[#d7b84f] text-sm transition-colors"
            >
              {isSignUp ? 'Já tem uma conta? Entrar' : 'Não tem conta? Criar conta'}
            </button>
          </div>

          {!isSignUp && (
            <div className="mt-4 text-center">
              <Link href="/esqueci-senha" className="text-white/60 hover:text-white text-sm transition-colors">
                Esqueceu sua senha?
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-[#E7C964] hover:text-[#d7b84f] text-sm transition-colors">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            © 2024 ObraPlanner. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
