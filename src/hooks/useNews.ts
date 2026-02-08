import { useState, useEffect } from 'react';

export interface NewsArticle {
    id: string;
    title: string;
    description: string;
    source: string;
    category: 'Industry News' | 'Methodology Updates' | 'Tool Releases' | 'Career Insights';
    date: string;
    url: string;
    isNew: boolean;
}

interface HNHit {
    objectID: string;
    title: string;
    url: string;
    author: string;
    created_at: string;
    story_text?: string;
}

const categorizeArticle = (title: string): NewsArticle['category'] => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('ai') || lowerTitle.includes('tech') || lowerTitle.includes('startup')) {
        return 'Industry News';
    }
    if (lowerTitle.includes('agile') || lowerTitle.includes('scrum') || lowerTitle.includes('methodology')) {
        return 'Methodology Updates';
    }
    if (lowerTitle.includes('tool') || lowerTitle.includes('jira') || lowerTitle.includes('app')) {
        return 'Tool Releases';
    }
    return 'Career Insights';
};

const isRecent = (dateString: string): boolean => {
    const articleDate = new Date(dateString);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return articleDate > twoDaysAgo;
};

export const useNews = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);

                // Search for PM-related topics on Hacker News
                const queries = ['product management', 'agile', 'scrum', 'project management'];
                const allArticles: NewsArticle[] = [];

                // Calculate timestamp for 7 days ago (seconds)
                const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);

                for (const query of queries) {
                    const response = await fetch(
                        `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story&numericFilters=created_at_i>${sevenDaysAgo}&hitsPerPage=5`
                    );

                    if (!response.ok) throw new Error('Failed to fetch news');

                    const data = await response.json();

                    const transformedArticles: NewsArticle[] = data.hits
                        .filter((hit: HNHit) => hit.url && hit.title)
                        .map((hit: HNHit) => ({
                            id: hit.objectID,
                            title: hit.title,
                            description: hit.story_text || `Interesting discussion about ${query} on Hacker News`,
                            source: 'Hacker News',
                            category: categorizeArticle(hit.title),
                            date: hit.created_at,
                            url: hit.url,
                            isNew: isRecent(hit.created_at)
                        }));

                    allArticles.push(...transformedArticles);
                }

                // Remove duplicates and limit to 10 articles
                const uniqueArticles = allArticles
                    .filter((article, index, self) =>
                        index === self.findIndex((a) => a.title === article.title)
                    )
                    .slice(0, 10);

                setArticles(uniqueArticles);
                setError(null);
            } catch (err) {
                setError('Failed to load news articles');
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return { articles, loading, error };
};
