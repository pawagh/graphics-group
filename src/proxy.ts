import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/team', '/join-us', '/courses', '/courses/:path*']
};
