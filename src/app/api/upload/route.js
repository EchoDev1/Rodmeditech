import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

/**
 * POST /api/upload
 * Accepts: multipart/form-data with:
 *   - file: the image file
 *   - founderId: (optional) if provided, immediately writes the photo to the Founder record in the DB
 *
 * Why we write to DB here instead of returning base64 to the client:
 *   - A base64 image (~500KB–3MB) sent back through a JSON PUT body can exceed
 *     Vercel's 4.5MB serverless body limit, causing silent save failures.
 *   - Writing directly from this multipart upload avoids that bottleneck entirely.
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const founderId = formData.get('founderId'); // optional

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // 2MB hard limit — compress images before uploading if needed
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Image must be smaller than 2MB. Please compress the image first.' },
        { status: 400 }
      );
    }

    // Convert to base64 data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // If a founderId was provided, write the photo directly to the DB right now.
    // This avoids sending the large base64 string through a separate JSON PUT request.
    if (founderId && founderId !== 'new') {
      await prisma.founder.update({
        where: { id: founderId },
        data: { photo: dataUrl },
      });
      return NextResponse.json({ url: dataUrl, saved: true });
    }

    // For new founders (no ID yet), return the URL for the caller to hold in state
    // and include in the initial POST when creating the founder.
    return NextResponse.json({ url: dataUrl, saved: false });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
  }
}
