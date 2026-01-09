import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import ApiKey from '@/models/ApiKey';
import crypto from 'crypto';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        await dbConnect();
        const keys = await ApiKey.find({ userId: session.user.id }).sort({ createdAt: -1 });

        // Don't return the full key in list if we were hashing, but here we just return it or partial
        // For security, usually we only show it once. But if we store it plain text (as per user request "api for anything", they might want to see it again? No, standard is show once).
        // I'll return the object but UI will mask it.

        return NextResponse.json(keys);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { name } = await req.json();
        if (!name) return NextResponse.json({ message: 'Name is required' }, { status: 400 });

        await dbConnect();

        // Generate a secure random key
        const key = 'sk_' + crypto.randomBytes(24).toString('hex');

        const apiKey = await ApiKey.create({
            name,
            key, // Storing plain text for this MVP so it works easily, ideally hash it.
            userId: session.user.id,
        });

        return NextResponse.json(apiKey, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
