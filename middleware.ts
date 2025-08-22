// Middleware temporariamente desabilitado para manter a página inicial funcionando
// Será reativado quando o login real for necessário

export async function middleware(req: any) {
  return new Response()
}

export const config = {
  matcher: []
}
