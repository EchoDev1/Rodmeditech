import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

/**
 * GET /api/founders/[id]/photo
 * Streams the founder's photo directly from the database as an image response.
 * This avoids sending large base64 strings through RSC payloads or JSON bodies.
 */
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const founder = await prisma.founder.findUnique({
            where: { id },
            select: { photo: true }, // only fetch the photo field
        });

        if (!founder || !founder.photo) {
            return new NextResponse(null, { status: 404 });
        }

        // The photo is stored as a data URL: "data:image/jpeg;base64,..."
        // Parse the MIME type and raw base64 from it.
        const dataUrl = founder.photo;
        const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);

        if (!matches) {
            return new NextResponse(null, { status: 422 });
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        const imageBuffer = Buffer.from(base64Data, 'base64');

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': mimeType,
                // Cache for 7 days on client, revalidate in background after 1 day
                'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
            },
        });
    } catch (error) {
        console.error('Error serving founder photo:', error);
        return new NextResponse(null, { status: 500 });
    }
}
