import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// GET single founder
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const founder = await prisma.founder.findUnique({
      where: { id }
    });

    if (!founder) {
      return NextResponse.json(
        { error: 'Founder not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(founder);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch founder' },
      { status: 500 }
    );
  }
}

// PUT Update founder
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role, bio, photo, specialties, portfolio, email, order } = body;

    const founder = await prisma.founder.update({
      where: { id },
      data: {
        name,
        role,
        bio,
        photo,
        specialties: JSON.stringify(specialties || []),
        portfolio,
        email,
        order
      }
    });

    return NextResponse.json(founder);
  } catch (error) {
    console.error('Error updating founder:', error);
    return NextResponse.json(
      { error: 'Failed to update founder' },
      { status: 500 }
    );
  }
}

// DELETE founder
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.founder.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Founder deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete founder' },
      { status: 500 }
    );
  }
}
