import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

// GET all founders
export async function GET() {
  try {
    const founders = await prisma.founder.findMany({
      orderBy: { order: 'asc' },
      // Exclude the giant photo blob from list queries — use the proxy URL instead
      select: {
        id: true,
        name: true,
        role: true,
        bio: true,
        specialties: true,
        portfolio: true,
        email: true,
        order: true,
        createdAt: true,
        updatedAt: true,
        // We don't select photo here; the UI derives the URL from the id
      }
    });

    // Attach the photo proxy URL for each founder
    const foundersWithPhotoUrl = founders.map(f => ({
      ...f,
      photo: `/api/founders/${f.id}/photo`,
    }));

    return NextResponse.json(foundersWithPhotoUrl);
  } catch (error) {
    console.error('Error fetching founders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch founders' },
      { status: 500 }
    );
  }
}

// POST - Create new founder
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, bio, photo, specialties, portfolio, email, order } = body;

    const founder = await prisma.founder.create({
      data: {
        name,
        role,
        bio,
        // photo may be a data URL (for brand-new founders uploaded before save)
        // or null — store whatever was given
        photo: photo || null,
        specialties: JSON.stringify(specialties || []),
        portfolio: portfolio || null,
        email,
        order: order || 0,
      },
    });

    // If a data URL photo was included in the initial creation,
    // it's now stored in the DB. Return the proxy URL for display.
    return NextResponse.json({
      ...founder,
      photo: founder.photo ? `/api/founders/${founder.id}/photo` : null,
    });
  } catch (error) {
    console.error('Error creating founder:', error);
    return NextResponse.json({ error: 'Failed to create founder' }, { status: 500 });
  }
}
