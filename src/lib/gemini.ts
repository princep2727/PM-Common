import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Mock Data for fallback
const MOCK_QUESTIONS: Record<string, string[]> = {
    'Behavioral': [
        "Tell me about a time you had a conflict with a stakeholder. How did you resolve it?",
        "Describe a situation where you had to make a tough decision with incomplete data.",
        "Tell me about a product you launched that failed. What did you learn?"
    ],
    'Project Execution': [
        "How do you handle scope creep when the deadline is fixed?",
        "A key stakeholder wants to add a feature late in the project. What do you do?",
        "Describe how you manage cross-functional team dependencies."
    ],
    'Analytical': [
        "Your project is 20% over budget and 2 weeks behind schedule. What is your recovery plan?",
        "How do you calculate ROI for a internal tool project?",
        "Explain Earned Value Management (EVM) to a non-technical stakeholder."
    ],
    'Strategy': [
        "How do you prioritize projects in a portfolio with limited resources?",
        "What is your approach to risk management for a high-visibility launch?",
        "How do you align project goals with company OKRs?"
    ]
};

const MOCK_FEEDBACK = {
    score: 7,
    feedback: "This is a solid start. You used the STAR method structure well (Situation, Task, Action, Result). \n\n**Strengths:**\n- Clear context provided.\n- Actionable steps were listed.\n\n**Areas for Improvement:**\n- Quantify the impact (e.g., 'improved retention by 10%').\n- Focus more on your specific role rather than 'we'.",
    improvedAnswer: "Here is a refined version: 'In my role at X, I noticed... I took initiative to... resulting in a 20% increase in...'"
};

export const generateInterviewQuestion = async (topic: string, difficulty: string): Promise<string> => {
    if (!apiKey) {
        console.warn('Gemini API Key missing. Using Mock Data.');
        const questions = MOCK_QUESTIONS[topic] || MOCK_QUESTIONS['Behavioral'];
        return questions[Math.floor(Math.random() * questions.length)];
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Act as a Senior Project Manager Interviewer at a FAANG company. 
        Generate a single challenging ${difficulty} level interview question about "${topic}".
        Return ONLY the question text. Do not add intro/outro.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Tell me about yourself and why you want to be a PM."; // Fallback
    }
};

export const provideFeedback = async (question: string, answer: string): Promise<{ score: number, feedback: string }> => {
    if (!apiKey) {
        return new Promise(resolve => setTimeout(() => resolve(MOCK_FEEDBACK), 1500));
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Act as a Senior Project Manager Interviewer. 
        Question: "${question}"
        Candidate Answer: "${answer}"
        
        Provide a structured evaluation in JSON format with:
        1. score (1-10)
        2. feedback (Markdown formatted, highlighting strengths and weaknesses, employing STAR method analysis)
        
        Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Feedback Error:", error);
        return {
            score: 0,
            feedback: "Error analyzing response. Please try again or check API configuration."
        };
    }
};
