import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String, // For credentials provider
        select: false,
    },
    image: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username'],
        match: [/^[a-zA-Z0-9_-]+$/, 'Username is invalid'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = models.User || model('User', UserSchema);

export default User;
