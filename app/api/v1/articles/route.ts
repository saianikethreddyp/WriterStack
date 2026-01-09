import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ApiKey from '@/models/ApiKey';
import Article from '@/models/Article';

export async function GET(req: Request) {
    try {
        const apiKey = req.headers.get('X-API-KEY');

        if (!apiKey) {
            return NextResponse.json({ message: 'Missing X-API-KEY header' }, { status: 401 });
        }

        await dbConnect();

        // Find the key
        const keyRecord = await ApiKey.findOne({ key: apiKey });
        if (!keyRecord) {
            return NextResponse.json({ message: 'Invalid API Key' }, { status: 401 });
        }

        // Update last used
        await ApiKey.findByIdAndUpdate(keyRecord._id, { lastUsed: new Date() });

        // Fetch published articles for the user associated with this key
        const articles = await Article.find({
            authorId: keyRecord.userId,
            published: true
        })
            .select('title slug summary published createdAt image_url')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            object: 'list',
            count: articles.length,
            data: articles
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
