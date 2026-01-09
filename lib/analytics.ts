import Article from '@/models/Article';
import DailyStat from '@/models/DailyStat';

export async function trackView(articleId: string, userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        // 1. Increment total article views
        await Article.findByIdAndUpdate(articleId, { $inc: { views: 1 } });

        // 2. Increment daily stat
        await DailyStat.findOneAndUpdate(
            { articleId, date: today },
            {
                $inc: { views: 1 },
                $setOnInsert: { userId } // Set userId only if creating new doc
            },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error('Failed to track view:', error);
        // Don't fail the request just because tracking failed
    }
}
