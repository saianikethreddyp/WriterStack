import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, username } = body;

        if (!name || !email || !password || !username) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
            }
            if (existingUser.username === username) {
                return NextResponse.json({ message: 'Username already taken' }, { status: 400 });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: 'User created successfully', userId: user._id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
