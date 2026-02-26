import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// PUT Update contact info
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { type, title, content, icon, order } = body;

    const contactInfo = await prisma.contactInfo.update({
      where: { id },
      data: {
        type,
        title,
        content: JSON.stringify(content || []),
        icon,
        order
      }
    });

    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}

// DELETE contact info
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.contactInfo.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Contact info deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete contact info' },
      { status: 500 }
    );
  }
}
