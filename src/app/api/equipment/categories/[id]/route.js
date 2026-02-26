import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const category = await prisma.equipmentCategory.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
                order: body.order || 0,
            }
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await prisma.equipmentCategory.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
