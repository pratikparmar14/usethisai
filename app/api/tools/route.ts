import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const tools = await prisma.tool.findMany({
            select: {
                name: true,
                slug: true,
                pricing: true,
                website: true,
                professions: {
                    select: {
                        profession: {
                            select: {
                                title: true,
                                slug: true,
                            },
                        },
                    },
                    take: 3,
                },
            },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(tools);
    } catch (error) {
        console.error('Error fetching tools:', error);
        return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
    }
}
