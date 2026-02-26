import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET About page content
export async function GET() {
  try {
    const about = await prisma.aboutPage.findFirst();
    const values = await prisma.value.findMany({
      orderBy: { order: 'asc' }
    });
    const milestones = await prisma.milestone.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({
      about,
      values,
      milestones
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch about page content' },
      { status: 500 }
    );
  }
}

// PUT Update About page content
export async function PUT(request) {
  try {
    const body = await request.json();
    const { mission, vision } = body;

    // Check if about page exists
    const existing = await prisma.aboutPage.findFirst();

    let about;
    if (existing) {
      about = await prisma.aboutPage.update({
        where: { id: existing.id },
        data: { mission, vision }
      });
    } else {
      about = await prisma.aboutPage.create({
        data: { mission, vision }
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update about page content' },
      { status: 500 }
    );
  }
}
