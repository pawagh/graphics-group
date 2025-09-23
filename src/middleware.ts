import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminTokenEdge } from '@/lib/auth';

export async function middleware(request: NextRequest) {
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
  matcher: ['/admin/:path*']
};
