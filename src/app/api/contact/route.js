import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// GET all contact info
export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info', details: error.message },
      { status: 500 }
    );
  }
}

// POST Create new contact info
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, title, content, icon, order } = body;

    const contactInfo = await prisma.contactInfo.create({
      data: {
        type,
        title,
        content: JSON.stringify(content || []),
        icon,
        order: order || 0
      }
    });

    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create contact info' },
      { status: 500 }
    );
  }
}
