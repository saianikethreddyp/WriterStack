import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id).select('-password');

    return NextResponse.json(user);
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, image, bio, twitter, github, website } = body;

        await dbConnect();

        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            {
                name,
                image,
                bio,
                socialLinks: {
                    twitter,
                    github,
                    website,
                },
            },
            { new: true }
        ).select('-password');

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('[USER_UPDATE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
