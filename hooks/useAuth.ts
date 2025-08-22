'use client'

import { useEffect, useState } from 'react'
import { supabase, type User, type AuthState } from '@/lib/supabase'

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    // Verificar sessão atual
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          setAuthState({ user: null, loading: false, error: error.message })
          return
        }

        if (session?.user) {
          // Buscar dados do usuário na tabela usuarios
          const { data: usuario, error: usuarioError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (usuarioError && usuarioError.code !== 'PGRST116') {
            setAuthState({ user: null, loading: false, error: usuarioError.message })
            return
          }

          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            nome: usuario?.nome_completo || session.user.user_metadata?.nome || 'Usuário',
            empresa: usuario?.empresa_id ? 'Empresa' : undefined, // Simplificado por enquanto
            cargo: usuario?.tipo_usuario,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at
          }

          setAuthState({ user, loading: false, error: null })
        } else {
          setAuthState({ user: null, loading: false, error: null })
        }
      } catch (error) {
        setAuthState({ user: null, loading: false, error: 'Erro ao verificar sessão' })
      }
    }

    getSession()

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Buscar dados do usuário na tabela usuarios
          const { data: usuario } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', session.user.id)
            .single()

          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            nome: usuario?.nome_completo || session.user.user_metadata?.nome || 'Usuário',
            empresa: usuario?.empresa_id ? 'Empresa' : undefined,
            cargo: usuario?.tipo_usuario,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at
          }

          setAuthState({ user, loading: false, error: null })
        } else if (event === 'SIGNED_OUT') {
          setAuthState({ user: null, loading: false, error: null })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setAuthState(prev => ({ ...prev, loading: false, error: error.message }))
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      const errorMessage = 'Erro ao fazer login'
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }))
      return { error: errorMessage }
    }
  }

  const signUp = async (email: string, password: string, nome: string, empresa?: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome_completo: nome,
            empresa
          }
        }
      })

      if (error) {
        setAuthState(prev => ({ ...prev, loading: false, error: error.message }))
        return { error: error.message }
      }

      if (data.user) {
        // Criar registro na tabela usuarios
        const { error: usuarioError } = await supabase
          .from('usuarios')
          .insert([
            {
              id: data.user.id,
              nome_completo: nome,
              email: email,
              tipo_usuario: 'admin', // Valor padrão
              created_at: new Date().toISOString()
            }
          ])

        if (usuarioError) {
          console.error('Erro ao criar usuário:', usuarioError)
        }
      }

      return { error: null }
    } catch (error) {
      const errorMessage = 'Erro ao criar conta'
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }))
      return { error: errorMessage }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signIn,
    signUp,
    signOut
  }
}
