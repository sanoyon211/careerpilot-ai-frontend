import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/resume',
    '/saved-jobs',
    '/applied-jobs',
    '/manage-jobs',
    '/add-job',
    '/ai-chat',
    '/ai-roadmap',
    '/ai-recommendations',
    '/settings',
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect logged-in users away from auth pages
  const authPaths = ['/login', '/register'];
  const isAuthPath = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPath && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/resume/:path*',
    '/saved-jobs/:path*',
    '/applied-jobs/:path*',
    '/manage-jobs/:path*',
    '/add-job/:path*',
    '/ai-chat/:path*',
    '/ai-roadmap/:path*',
    '/ai-recommendations/:path*',
    '/settings/:path*',
    '/login',
    '/register',
  ],
};
