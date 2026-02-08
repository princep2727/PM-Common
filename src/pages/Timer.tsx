import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProgress } from '../hooks/useProgress';
import {
    Timer as TimerIcon,
    Play,
    Pause,
    RotateCcw,
    Settings,
    Coffee,
    Brain,
    Zap,
    Volume2,
    VolumeX,
    Check,
} from 'lucide-react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerSettings {
    workMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    sessionsUntilLongBreak: number;
}

const defaultSettings: TimerSettings = {
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    sessionsUntilLongBreak: 4,
};

export const Timer: React.FC = () => {
    const { addStudyTime } = useProgress();
    const [settings, setSettings] = useState<TimerSettings>(() => {
        const stored = localStorage.getItem('pm-hub-timer-settings');
        return stored ? JSON.parse(stored) : defaultSettings;
    });
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(settings.workMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [tempSettings, setTempSettings] = useState(settings);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const playSound = useCallback(() => {
        if (soundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }
    }, [soundEnabled]);

    const getTimeForMode = useCallback((m: TimerMode) => {
        switch (m) {
            case 'work': return settings.workMinutes * 60;
            case 'shortBreak': return settings.shortBreakMinutes * 60;
            case 'longBreak': return settings.longBreakMinutes * 60;
        }
    }, [settings]);

    const handleTimerComplete = useCallback(() => {
        playSound();
        setIsRunning(false);

        if (mode === 'work') {
            const newCompletedSessions = completedSessions + 1;
            setCompletedSessions(newCompletedSessions);
            addStudyTime(settings.workMinutes);

            if (newCompletedSessions % settings.sessionsUntilLongBreak === 0) {
                setMode('longBreak');
                setTimeLeft(settings.longBreakMinutes * 60);
            } else {
                setMode('shortBreak');
                setTimeLeft(settings.shortBreakMinutes * 60);
            }
        } else {
            setMode('work');
            setTimeLeft(settings.workMinutes * 60);
        }
    }, [mode, completedSessions, settings, playSound, addStudyTime]);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now();
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        handleTimerComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, handleTimerComplete]);

    useEffect(() => {
        localStorage.setItem('pm-hub-timer-settings', JSON.stringify(settings));
    }, [settings]);

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(getTimeForMode(mode));
    };

    const switchMode = (newMode: TimerMode) => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(getTimeForMode(newMode));
    };

    const saveSettings = () => {
        setSettings(tempSettings);
        setTimeLeft(tempSettings.workMinutes * 60);
        setMode('work');
        setShowSettings(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((getTimeForMode(mode) - timeLeft) / getTimeForMode(mode)) * 100;

    const modeConfig = {
        work: { icon: Brain, label: 'Focus Time', color: 'from-primary-500 to-accent-500', bgColor: 'bg-primary-500' },
        shortBreak: { icon: Coffee, label: 'Short Break', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-500' },
        longBreak: { icon: Zap, label: 'Long Break', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-500' },
    };

    const currentMode = modeConfig[mode];
    const ModeIcon = currentMode.icon;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Hidden audio element for notifications */}
            <audio ref={audioRef} preload="auto">
                <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleT8/z/b/w3Rv/zWy9vrsmWg7G5fc9PCqbEAfSZfd9P/BezQcOJfe9P/fhTggADCT4fT/4YY2IRqH5fP/64xHHwF97vD/8JBVIQBs+O3/9ZZdHwBZ/+r//5xoHwBG//n//6F0HwAx//n//6WCHwAa//X//6mNHwAA//H/+qyWHgD/8v/1r58cACUy8P/ysaYZAEhE6P/vubAUAGxVz//sv70OAJFnu//pw8gCALZ+o//mxdL6ANqVif/jxtjyAO+qc//gx9zrAP3IYAA=" type="audio/wav" />
            </audio>

            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <TimerIcon className="w-8 h-8 text-primary-500" />
                    Study Timer
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Pomodoro technique for focused learning</p>
            </div>

            {/* Mode Selection */}
            <div className="flex justify-center gap-2">
                {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => {
                    const config = modeConfig[m];
                    const Icon = config.icon;
                    return (
                        <button
                            key={m}
                            onClick={() => switchMode(m)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${mode === m
                                    ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {config.label}
                        </button>
                    );
                })}
            </div>

            {/* Timer Display */}
            <div className="flex justify-center">
                <div className="relative">
                    <svg className="w-72 h-72 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="url(#timerGradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${progress * 2.83} 283`}
                            className="transition-all duration-1000"
                        />
                        <defs>
                            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={mode === 'work' ? '#6366f1' : mode === 'shortBreak' ? '#10b981' : '#f59e0b'} />
                                <stop offset="100%" stopColor={mode === 'work' ? '#a855f7' : mode === 'shortBreak' ? '#14b8a6' : '#f97316'} />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <ModeIcon className={`w-8 h-8 mb-2 ${mode === 'work' ? 'text-primary-500' : mode === 'shortBreak' ? 'text-emerald-500' : 'text-amber-500'}`} />
                        <span className="text-5xl font-bold text-gray-800 dark:text-white font-mono">
                            {formatTime(timeLeft)}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 mt-2">{currentMode.label}</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={toggleTimer}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform hover:scale-105 ${isRunning ? 'bg-red-500 hover:bg-red-600' : `bg-gradient-to-r ${currentMode.color}`
                        }`}
                >
                    {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                    {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </button>
                <button
                    onClick={() => {
                        setTempSettings(settings);
                        setShowSettings(true);
                    }}
                    className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                    <Settings className="w-6 h-6" />
                </button>
            </div>

            {/* Session Counter */}
            <div className="flex justify-center">
                <div className="card p-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">Completed Sessions</p>
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: settings.sessionsUntilLongBreak }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${i < completedSessions % settings.sessionsUntilLongBreak || (completedSessions > 0 && completedSessions % settings.sessionsUntilLongBreak === 0 && i === settings.sessionsUntilLongBreak - 1)
                                        ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                            >
                                {i < completedSessions % settings.sessionsUntilLongBreak ? <Check className="w-4 h-4" /> : i + 1}
                            </div>
                        ))}
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{completedSessions}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total sessions today</p>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="card p-6 w-full max-w-md animate-slide-up">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Timer Settings
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Work Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={tempSettings.workMinutes}
                                    onChange={(e) => setTempSettings({ ...tempSettings, workMinutes: parseInt(e.target.value) || 25 })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Short Break (minutes)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={tempSettings.shortBreakMinutes}
                                    onChange={(e) => setTempSettings({ ...tempSettings, shortBreakMinutes: parseInt(e.target.value) || 5 })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Long Break (minutes)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={tempSettings.longBreakMinutes}
                                    onChange={(e) => setTempSettings({ ...tempSettings, longBreakMinutes: parseInt(e.target.value) || 15 })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Sessions until Long Break
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={tempSettings.sessionsUntilLongBreak}
                                    onChange={(e) => setTempSettings({ ...tempSettings, sessionsUntilLongBreak: parseInt(e.target.value) || 4 })}
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={saveSettings} className="btn-primary flex-1">
                                Save Settings
                            </button>
                            <button onClick={() => setShowSettings(false)} className="btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
