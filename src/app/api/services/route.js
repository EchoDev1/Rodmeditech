import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const service = await prisma.service.create({
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
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
