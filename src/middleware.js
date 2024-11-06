import { NextResponse } from 'next/server';

export function middleware(req) {
  // Obter o token de autenticação (isso pode vir de cookies, localStorage, etc.)
  const token = req.cookies.get('token'); // Exemplo usando cookies

  // Defina as rotas que deseja proteger
  const protectedRoutes = ['/telas/admin', '/telas/usuario']; // Adicione suas rotas privadas

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // Se o token não existir, redirecione para a página de login
    if (!token) {
      return NextResponse.redirect(new URL('/telas/login', req.url));
    }
  }

  // Continuar normalmente se o usuário estiver autenticado
  return NextResponse.next();
}

export const config = {
  matcher: ['/telas/admin', '/telas/usuario'], // Rotas que o middleware deve interceptar
};