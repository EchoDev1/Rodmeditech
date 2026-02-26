import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const product = await prisma.equipmentProduct.update({
            where: { id },
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
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await prisma.equipmentProduct.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
