import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

// GET all FAQs
export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST Create new FAQ
export async function POST(request) {
  try {
    const body = await request.json();
    const { question, answer, order } = body;

    const faq = await prisma.fAQ.create({
      data: { question, answer, order: order || 0 }
    });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}
