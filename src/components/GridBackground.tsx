
export const GridBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Base Background - Vibrant Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e5e5e5 1px, transparent 1px),
                        linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* Dark Mode Grid Override (for better contrast) */}
            <div
                className="absolute inset-0 opacity-0 dark:opacity-[0.2]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #333 1px, transparent 1px),
                        linear-gradient(to bottom, #333 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* Ambient Glow (Moving & Vibrant & Stronger) */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/30 blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-fuchsia-500/30 blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-screen pointer-events-none" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-screen pointer-events-none" style={{ animationDelay: '4s' }} />
        </div>
    );
};
