import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

// GET single founder
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const founder = await prisma.founder.findUnique({
      where: { id },
      select: {
        id: true, name: true, role: true, bio: true,
        specialties: true, portfolio: true, email: true,
        order: true, createdAt: true, updatedAt: true,
      }
    });

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...founder,
      photo: `/api/founders/${founder.id}/photo`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch founder' }, { status: 500 });
  }
}

// PUT - Update founder (does NOT update photo — photo is updated via /api/upload)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role, bio, specialties, portfolio, email, order } = body;

    const founder = await prisma.founder.update({
      where: { id },
      data: {
        name,
        role,
        bio,
        specialties: JSON.stringify(specialties || []),
        portfolio: portfolio || null,
        email,
        order: order ?? 0,
        // photo is intentionally excluded — it's only updated by the /api/upload endpoint
      },
      select: {
        id: true, name: true, role: true, bio: true,
        specialties: true, portfolio: true, email: true,
        order: true, createdAt: true, updatedAt: true,
      }
    });

    return NextResponse.json({
      ...founder,
      photo: `/api/founders/${founder.id}/photo`,
    });
  } catch (error) {
    console.error('Error updating founder:', error);
    return NextResponse.json({ error: 'Failed to update founder' }, { status: 500 });
  }
}

// DELETE founder
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.founder.delete({ where: { id } });
    return NextResponse.json({ message: 'Founder deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete founder' }, { status: 500 });
  }
}
