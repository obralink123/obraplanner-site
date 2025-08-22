import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yollophdpsqxivljkqzw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbGxvcGhkcHNxeGl2bGprcXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjgzMDIsImV4cCI6MjA2NjgwNDMwMn0.GFHW23R_63MclSjF6FxZhi_0qltOIzan8Ky8Qz3rUQ4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para autenticação baseados na tabela 'usuarios' existente
export interface User {
  id: string
  email: string
  nome: string
  empresa?: string
  cargo?: string
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}
