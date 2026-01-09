import mongoose, { Schema, model, models } from 'mongoose';

const ApiKeySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lastUsed: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ApiKey = models.ApiKey || model('ApiKey', ApiKeySchema);

export default ApiKey;
