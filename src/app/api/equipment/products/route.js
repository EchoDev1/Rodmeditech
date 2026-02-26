import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const product = await prisma.equipmentProduct.create({
            data: {
                name: body.name,
                description: body.description,
                features: typeof body.features === 'string' ? body.features : JSON.stringify(body.features),
                categoryId: body.categoryId,
                order: body.order || 0,
            }
        });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
