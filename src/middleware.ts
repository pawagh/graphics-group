import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminTokenEdge } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Public redirects for renamed sections
  if (request.nextUrl.pathname === '/team') {
    return NextResponse.redirect(new URL('/people', request.url));
  }
  if (request.nextUrl.pathname === '/join-us') {
    return NextResponse.redirect(new URL('/opportunities', request.url));
  }
  // Keep teaching as first-class route; also support legacy /courses
  if (request.nextUrl.pathname === '/courses') {
    return NextResponse.redirect(new URL('/teaching', request.url));
  }
  // Redirect /courses/* to /teaching/*
  if (request.nextUrl.pathname.startsWith('/courses/')) {
    const path = request.nextUrl.pathname.replace('/courses/', '/teaching/');
    return NextResponse.redirect(new URL(path, request.url));
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for authentication token
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify token using Edge Runtime compatible function
    const user = await verifyAdminTokenEdge(token);
    if (!user) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin-token');
      return response;
    }

    // Add user info to headers for use in admin pages
    const response = NextResponse.next();
    response.headers.set('x-admin-user', JSON.stringify(user));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/team', '/join-us', '/courses', '/courses/:path*']
};
