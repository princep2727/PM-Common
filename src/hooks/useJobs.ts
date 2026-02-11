import { useState, useEffect } from 'react';

export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Remote' | 'Hybrid' | 'Onsite';
    salary: string;
    postedDate: string;
    isNew: boolean;
    tags: string[];
    requirements: string[];
    applyUrl: string;
    source: string;
}

interface JSearchJob {
    job_id: string;
    job_title: string;
    employer_name: string;
    job_city: string;
    job_country: string;
    job_is_remote: boolean;
    job_min_salary: number | null;
    job_max_salary: number | null;
    job_salary_currency: string | null;
    job_posted_at_datetime_utc: string;
    job_description: string;
    job_google_link: string;
    job_apply_link: string;
    job_highlights?: {
        Qualifications?: string[];
        Responsibilities?: string[];
    };
}

const CACHE_KEY = 'pm_hub_jobs_cache';
const LAST_FETCH_KEY = 'pm_hub_jobs_last_fetch';
// Sample jobs for fallback when API limit is reached
const SAMPLE_JOBS: JobListing[] = [
    {
        id: 'sample-1',
        title: 'Senior Project Manager',
        company: 'Stripe',
        location: 'Dublin, Ireland',
        type: 'Hybrid',
        salary: '€85,000 - €110,000',
        postedDate: new Date().toISOString(),
        isNew: true,
        tags: ['FinTech', 'Payments', 'Project'],
        requirements: ['5+ years experience', 'API product experience', 'Strong technical background'],
        applyUrl: 'https://stripe.com/jobs',
        source: 'LinkedIn'
    },
    {
        id: 'sample-2',
        title: 'Technical Project Manager',
        company: 'Intercom',
        location: 'Dublin, Ireland',
        type: 'Onsite',
        salary: '€70,000 - €90,000',
        postedDate: new Date().toISOString(),
        isNew: true,
        tags: ['SaaS', 'B2B', 'Agile'],
        requirements: ['Experience with large scale systems', 'Scrum Master certification', 'Engineering background'],
        applyUrl: 'https://www.intercom.com/careers',
        source: 'Indeed'
    },
    {
        id: 'sample-3',
        title: 'Project Manager',
        company: 'Workday',
        location: 'Dublin, Ireland',
        type: 'Hybrid',
        salary: 'Competitive',
        postedDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        isNew: true,
        tags: ['HR Tech', 'Enterprise', 'Project Management'],
        requirements: ['CSPO certification', 'Prioritizing backlogs', 'Stakeholder management'],
        applyUrl: 'https://www.workday.com/en-us/company/careers.html',
        source: 'IrishJobs'
    },
    {
        id: 'sample-4',
        title: 'Junior Project Manager',
        company: 'Ryanair Labs',
        location: 'Dublin, Ireland',
        type: 'Onsite',
        salary: '€45,000 - €55,000',
        postedDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        isNew: true,
        tags: ['Travel Tech', 'Entry Level', 'Project Management'],
        requirements: ['Degree in Business or IT', 'Organized', 'Fast-paced environment'],
        applyUrl: 'https://careers.ryanair.com/',
        source: 'Monster'
    },
    {
        id: 'sample-5',
        title: 'Program Manager',
        company: 'Google',
        location: 'Dublin, Ireland',
        type: 'Hybrid',
        salary: '€90,000 - €120,000',
        postedDate: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        isNew: false,
        tags: ['Big Tech', 'Program Management', 'Cross-functional'],
        requirements: ['Data analysis skills', 'Large scale project experience', 'Leadership'],
        applyUrl: 'https://careers.google.com/',
        source: 'Google Careers'
    },
    {
        id: 'sample-6',
        title: 'Scrum Master',
        company: 'Fidelity Investments',
        location: 'Dublin, Ireland',
        type: 'Hybrid',
        salary: '€65,000 - €85,000',
        postedDate: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        isNew: false,
        tags: ['Finance', 'Scrum', 'Agile Coaching'],
        requirements: ['PSM I/II', 'Financial services experience', 'Jira expert'],
        applyUrl: 'https://jobs.fidelity.com/',
        source: 'LinkedIn'
    }
];

export const useJobs = () => {
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSampleData, setIsSampleData] = useState(false);

    const extractRequirements = (description: string, highlights?: JSearchJob['job_highlights']): string[] => {
        if (highlights?.Qualifications && highlights.Qualifications.length > 0) {
            return highlights.Qualifications.slice(0, 4);
        }
        // Fallback to basic extraction if no highlights
        const cleanText = description.replace(/<[^>]*>/g, '. ');
        return cleanText
            .split('. ')
            .filter(sentence => sentence.length > 20 && sentence.length < 100)
            .slice(0, 3);
    };



    const fetchJobs = async () => {
        try {
            setLoading(true);

            // Check cache validity (Daily Fetch Strategy)
            const lastFetch = localStorage.getItem(LAST_FETCH_KEY);
            const cachedData = localStorage.getItem(CACHE_KEY);
            const now = Date.now();

            if (lastFetch && cachedData) {
                const lastFetchDate = new Date(parseInt(lastFetch)).toDateString();
                const today = new Date().toDateString();

                if (lastFetchDate === today) {
                    console.log('Using cached job data (today\'s fetch already done)');
                    setJobs(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
            }

            console.log('Fetching fresh job data from JSearch...');

            const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

            if (!apiKey || apiKey.includes('your_key')) {
                throw new Error('Missing or Invalid API Key');
            }

            const response = await fetch('https://jsearch.p.rapidapi.com/search?query=Project%20Manager%20in%20Ireland&num_pages=1&date_posted=3days', {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                if (response.status === 429) {
                    console.warn('Daily request limit reached. Using sample data.');
                    setJobs(SAMPLE_JOBS);
                    setIsSampleData(true);
                    // Cache sample data so we don't keep hitting API
                    localStorage.setItem(CACHE_KEY, JSON.stringify(SAMPLE_JOBS));
                    localStorage.setItem(LAST_FETCH_KEY, now.toString());
                    setLoading(false);
                    return;
                }
                const errorText = await response.text();
                throw new Error(`JSearch Error (${response.status}): ${response.statusText} - ${errorText.substring(0, 100)}`);
            }

            const data = await response.json();

            if (!data.data) {
                throw new Error('No job data received');
            }

            const transformedJobs: JobListing[] = data.data.map((job: JSearchJob) => ({
                id: job.job_id,
                title: job.job_title,
                company: job.employer_name,
                location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country,
                type: job.job_is_remote ? 'Remote' : 'Onsite',
                salary: job.job_min_salary && job.job_max_salary
                    ? `${job.job_salary_currency} ${job.job_min_salary.toLocaleString()} - ${job.job_max_salary.toLocaleString()}`
                    : 'Competitive',
                postedDate: job.job_posted_at_datetime_utc,
                isNew: true, // filtered by 'today'
                tags: ['Project Management', job.job_is_remote ? 'Remote' : 'Local', job.job_country],
                requirements: extractRequirements(job.job_description, job.job_highlights),
                applyUrl: job.job_apply_link || job.job_google_link,
                source: 'JSearch'
            }));

            if (transformedJobs.length === 0) {
                setJobs([]);
                setError('No jobs found matching the criteria.');
            } else {
                setJobs(transformedJobs);
                setError(null);
            }
            setIsSampleData(false);

            // Update cache
            localStorage.setItem(CACHE_KEY, JSON.stringify(transformedJobs));
            localStorage.setItem(LAST_FETCH_KEY, now.toString());

        } catch (err: any) {
            console.error('Error fetching jobs:', err);

            // Universal Fallback: If API fails (403, 429, Network), usage sample data
            console.warn('API failed, falling back to sample data');
            setJobs(SAMPLE_JOBS);
            setIsSampleData(true);
            setError(`Demo Mode: Live search unavailable (${err.message || 'Check API Key'}). Showing sample data.`);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return { jobs, loading, error, isSampleData, refetch: fetchJobs };
};
