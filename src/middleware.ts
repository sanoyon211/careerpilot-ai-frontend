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
    '/payment'
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

  // Role-based route protection
  if (accessToken && isProtectedPath) {
    try {
      // Decode JWT payload
      const payloadBase64 = accessToken.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const role = decodedPayload.role;

      const jobSeekerRoutes = ['/resume', '/saved-jobs', '/applied-jobs', '/ai-chat', '/ai-roadmap', '/ai-recommendations'];
      const employerRoutes = ['/manage-jobs', '/add-job', '/payment'];

      const isTryingToAccessJobSeekerRoute = jobSeekerRoutes.some(path => request.nextUrl.pathname.startsWith(path));
      const isTryingToAccessEmployerRoute = employerRoutes.some(path => request.nextUrl.pathname.startsWith(path));

      if (role === 'employer' && isTryingToAccessJobSeekerRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      if (role === 'job-seeker' && isTryingToAccessEmployerRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Error decoding JWT in middleware:', error);
      // If token is invalid, redirect to login and let them re-authenticate
      return NextResponse.redirect(new URL('/login', request.url));
    }
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
