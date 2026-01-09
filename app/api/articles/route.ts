import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { z } from 'zod';
import rateLimit from '@/lib/ratelimit';

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



// Schema Validation
const ArticleSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Invalid slug format"),
    content: z.string().min(1, "Content cannot be empty"),
    summary: z.string().optional(),
    published: z.boolean().optional(),
    image_url: z.string().url("Invalid image URL").optional().or(z.literal('')),
});



// Rate Limiter: 5 articles per minute per user
const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Rate Limit Check
        try {
            await limiter.check(NextResponse.next(), 5, session.user.id);
        } catch {
            return NextResponse.json({ message: 'Rate limit exceeded' }, { status: 429 });
        }

        const body = await req.json();

        // Validate Input
        const validation = ArticleSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
        }

        const { title, slug, content, summary, published, image_url } = validation.data;

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
