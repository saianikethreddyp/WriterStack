import mongoose from 'mongoose';

const DailyStatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
});

// Index for fast querying by user and date
DailyStatSchema.index({ userId: 1, date: 1 });
DailyStatSchema.index({ articleId: 1, date: 1 });

export default mongoose.models.DailyStat || mongoose.model('DailyStat', DailyStatSchema);
