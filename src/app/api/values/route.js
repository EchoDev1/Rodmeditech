import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// GET all values
export async function GET() {
  try {
    const values = await prisma.value.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(values);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch values' },
      { status: 500 }
    );
  }
}

// POST Create new value
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, icon, order } = body;

    const value = await prisma.value.create({
      data: { title, description, icon, order }
    });

    return NextResponse.json(value);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create value' },
      { status: 500 }
    );
  }
}
