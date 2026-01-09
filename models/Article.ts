import mongoose, { Schema, model, models } from 'mongoose';

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug'],
        index: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    summary: {
        type: String,
    },
    image_url: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Compound index to ensure slugs are unique per user if we wanted that, 
// OR globally unique? 
// For SaaS where URL is /username/slug, slug only needs to be unique per user.
ArticleSchema.index({ authorId: 1, slug: 1 }, { unique: true });

const Article = models.Article || model('Article', ArticleSchema);

export default Article;
