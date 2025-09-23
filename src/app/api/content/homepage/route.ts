import { NextRequest, NextResponse } from 'next/server';
import { updateHomepageContent } from '@/lib/content';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = verifyAdminToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    const updates = await request.json();
    const success = await updateHomepageContent(updates);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to update homepage content' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating homepage content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
