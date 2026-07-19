import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('accessToken')?.value ||
    request.cookies.get('refreshToken')?.value;

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
    '/payment',
  ];

  const { pathname, search } = request.nextUrl;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // If trying to access protected route without token -> redirect to login with redirect param
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from auth pages
  const authPaths = ['/login', '/register'];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Role-based route protection
  if (token && isProtectedPath) {
    try {
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        // Handle base64url format for JWTs
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decodedPayload = JSON.parse(jsonPayload);
        const role = decodedPayload.role;

        const jobSeekerRoutes = [
          '/resume',
          '/saved-jobs',
          '/applied-jobs',
          '/ai-chat',
          '/ai-roadmap',
          '/ai-recommendations',
        ];
        const employerRoutes = ['/manage-jobs', '/add-job', '/payment'];

        const isTryingJobSeekerRoute = jobSeekerRoutes.some((path) =>
          pathname.startsWith(path)
        );
        const isTryingEmployerRoute = employerRoutes.some((path) =>
          pathname.startsWith(path)
        );

        if (role === 'employer' && isTryingJobSeekerRoute) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (role === 'job-seeker' && isTryingEmployerRoute) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }
    } catch (error) {
      console.error('Middleware JWT Decode Warning:', error);
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
