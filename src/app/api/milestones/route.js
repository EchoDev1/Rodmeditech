import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// GET all milestones
export async function GET() {
  try {
    const milestones = await prisma.milestone.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(milestones);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch milestones' },
      { status: 500 }
    );
  }
}

// POST Create new milestone
export async function POST(request) {
  try {
    const body = await request.json();
    const { year, title, description, order } = body;

    const milestone = await prisma.milestone.create({
      data: { year, title, description, order }
    });

    return NextResponse.json(milestone);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create milestone' },
      { status: 500 }
    );
  }
}
