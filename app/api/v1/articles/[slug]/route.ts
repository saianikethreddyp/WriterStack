import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ApiKey from '@/models/ApiKey';
import Article from '@/models/Article';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const apiKey = req.headers.get('X-API-KEY');
        if (!apiKey) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { slug } = await params;

        await dbConnect();

        const keyRecord = await ApiKey.findOne({ key: apiKey });
        if (!keyRecord) return NextResponse.json({ message: 'Invalid API Key' }, { status: 401 });

        const article = await Article.findOne({
            slug,
            authorId: keyRecord.userId,
            published: true
        });

        if (!article) return NextResponse.json({ message: 'Article not found' }, { status: 404 });

        // Track view
        const { trackView } = await import('@/lib/analytics');
        // We await here to ensure consistent testing, but in prod could be loose
        await trackView(article._id, keyRecord.userId);

        return NextResponse.json(article);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
