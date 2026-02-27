import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

/**
 * POST /api/upload
 * Accepts multipart/form-data:
 *   - file:      the image file  
 *   - founderId: the DB id of the founder (required for existing founders)
 *
 * Strategy:
 *   - Convert image to base64 and store it in Founder.photo in the DB.
 *   - The photo field is then SERVED via /api/founders/[id]/photo as a real binary image.
 *   - The about page uses that short URL as the <img src> — avoiding RSC payload bloat.
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const founderId = formData.get('founderId');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    const MAX_SIZE = 3 * 1024 * 1024; // 3MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Image must be smaller than 3MB. Please compress the image first.' },
        { status: 400 }
      );
    }

    // Convert to base64 data URL for DB storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    if (founderId && founderId !== 'new') {
      // Save base64 to DB, and return the short proxy URL for display
      await prisma.founder.update({
        where: { id: founderId },
        data: { photo: dataUrl },
      });

      // The short URL that the about page will use as <img src>
      const photoUrl = `/api/founders/${founderId}/photo`;
      return NextResponse.json({ url: photoUrl, saved: true });
    }

    // New founder: return data URL temporarily (held in state until POST creates the record)
    return NextResponse.json({ url: dataUrl, saved: false });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
  }
}
