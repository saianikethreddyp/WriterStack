import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const articles = await Article.find({ authorId: session.user.id })
            .sort({ createdAt: -1 });

        return NextResponse.json(articles);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, slug, content, summary, published, image_url } = body;

        await dbConnect();

        // Check slug uniqueness for this user
        const existing = await Article.findOne({ authorId: session.user.id, slug });
        if (existing) {
            return NextResponse.json({ message: 'Slug already exists for this user' }, { status: 400 });
        }

        const article = await Article.create({
            title,
            slug,
            content,
            summary,
            published,
            image_url,
            authorId: session.user.id,
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
