import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// PUT Update value
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, icon, order } = body;

    const value = await prisma.value.update({
      where: { id },
      data: { title, description, icon, order }
    });

    return NextResponse.json(value);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update value' },
      { status: 500 }
    );
  }
}

// DELETE value
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.value.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Value deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete value' },
      { status: 500 }
    );
  }
}
