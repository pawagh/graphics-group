import { NextRequest, NextResponse } from 'next/server';
import { getPublications, addPublication, updatePublication, deletePublication } from '@/lib/publications';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    const publications = await getPublications();
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

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

    const publicationData = await request.json();
    const newPublication = await addPublication(publicationData);

    if (newPublication) {
      return NextResponse.json({ success: true, publication: newPublication });
    } else {
      return NextResponse.json(
        { error: 'Failed to add publication' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error adding publication:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const { slug, ...updateData } = await request.json();
    const success = await updatePublication(slug, updateData);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to update publication' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating publication:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const { slug } = await request.json();
    const success = await deletePublication(slug);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete publication' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
