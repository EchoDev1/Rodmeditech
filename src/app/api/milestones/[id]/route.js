import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// PUT Update milestone
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { year, title, description, order } = body;

    const milestone = await prisma.milestone.update({
      where: { id },
      data: { year, title, description, order }
    });

    return NextResponse.json(milestone);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update milestone' },
      { status: 500 }
    );
  }
}

// DELETE milestone
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.milestone.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Milestone deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete milestone' },
      { status: 500 }
    );
  }
}
