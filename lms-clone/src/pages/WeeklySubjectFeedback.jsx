import React, { useState } from 'react';
import { BookOpen, Star, Send, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const WeeklySubjectFeedback = () => {
    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Advanced React Patterns', instructor: 'Prof. Sarah Smith', submitted: false },
        { id: 2, name: 'Database Management', instructor: 'Dr. James Wilson', submitted: false },
    ]);

    const [ratings, setRatings] = useState({});

    const handleRate = (subjectId, score) => {
        setRatings(prev => ({ ...prev, [subjectId]: score }));
    };

    const handleSubmit = (subjectId) => {
        setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, submitted: true } : s));
        console.log(`Submitted feedback for subject ${subjectId} with rating ${ratings[subjectId]}`);
    };

    return (
        <>
            <Navbar />
            <div class="max-w-6xl mx-auto p-6 pt-7">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-white mb-2">Weekly Subject Feedback</h1>
                    <p class="text-neutral-400">Share your thoughts on this week's subjects</p>
                </div>
                <div class="bg-neutral-800/50 border border-neutral-800 rounded-xl p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open h-16 w-16 text-neutral-500 mx-auto mb-4" aria-hidden="true"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                    <h3 class="text-xl font-semibold text-neutral-300 mb-2">All Caught Up!</h3>
                    <p class="text-neutral-400">No subjects available for feedback at this time.</p>
                </div>
            </div>
        </>
    );
};

export default WeeklySubjectFeedback;
