import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        await dbConnect();

        const article = await Article.findOne({ _id: id, authorId: session.user.id });

        if (!article) return NextResponse.json({ message: 'Not found' }, { status: 404 });

        return NextResponse.json(article);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        await dbConnect();

        const article = await Article.findOne({ _id: id, authorId: session.user.id });

        if (!article) return NextResponse.json({ message: 'Not found' }, { status: 404 });

        // Update fields
        const updated = await Article.findByIdAndUpdate(id, body, { new: true });

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        await dbConnect();

        const result = await Article.deleteOne({ _id: id, authorId: session.user.id });

        if (result.deletedCount === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });

        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
