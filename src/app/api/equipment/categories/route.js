import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const categories = await prisma.equipmentCategory.findMany({
            orderBy: { order: 'asc' },
            include: { products: { orderBy: { order: 'asc' } } }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const category = await prisma.equipmentCategory.create({
            data: {
                name: body.name,
                description: body.description,
                order: body.order || 0,
            }
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
