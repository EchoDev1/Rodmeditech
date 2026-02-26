import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// PUT Update FAQ
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { question, answer, order, isActive } = body;

    const faq = await prisma.fAQ.update({
      where: { id },
      data: { question, answer, order, isActive }
    });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE FAQ
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.fAQ.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}
