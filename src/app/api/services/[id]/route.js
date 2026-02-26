import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const service = await prisma.service.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                icon: body.icon,
                bullets: typeof body.bullets === 'string' ? body.bullets : JSON.stringify(body.bullets),
                order: body.order || 0,
            }
        });
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await prisma.service.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
