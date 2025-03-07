import { NextResponse } from 'next/server';

export async function middleware(req) {
    const nextUrl = req.nextUrl;
    const token = req.headers.get('cookie'); // Aquí asumo que el token está almacenado en una cookie llamada 'token'

    // Si no hay token y la ruta no es '/admin/auth/login', redirige a la página de login
    if (!token && nextUrl.pathname !== '/admin/auth/login') {
        nextUrl.pathname = '/admin/auth/login';
        return NextResponse.redirect(nextUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
}
