import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// GET all founders
export async function GET() {
  try {
    const founders = await prisma.founder.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(founders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch founders' },
      { status: 500 }
    );
  }
}

// POST Create new founder
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, bio, photo, specialties, portfolio, email, order } = body;

    const founder = await prisma.founder.create({
      data: {
        name,
        role,
        bio,
        photo,
        specialties: JSON.stringify(specialties || []),
        portfolio,
        email,
        order: order || 0
      }
    });

    return NextResponse.json(founder);
  } catch (error) {
    console.error('Error creating founder:', error);
    return NextResponse.json(
      { error: 'Failed to create founder' },
      { status: 500 }
    );
  }
}
