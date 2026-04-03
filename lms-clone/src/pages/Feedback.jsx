// import React, { useState } from 'react';
// import { Plus, MessageSquare, Send, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const Feedback = () => {
    const [showForm, setShowForm] = useState(false);
    const [feedback, setFeedback] = useState({ type: 'Suggestion', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback Submitted:", feedback);
        setShowForm(false);
        // Add success toast or API call here
    };

    return (
        <>
        <Navbar />
            <div className="py-8 px-4 max-w-4xl mx-auto text-white">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold"> Feedback</h1>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                        >
                            <Plus className="w-4 h-4" /> Create Feedback
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    {showForm ? (
                        /* Feedback Form */
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 animate-in fade-in zoom-in duration-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-neutral-100">Create Feedback</h2>
                                
                                <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">Category</label>
                                    <select
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-neutral-100 outline-none focus:ring-2 focus:ring-blue-600"
                                        value={feedback.type}
                                        onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
                                    >
                                        <option>Suggestion</option>
                                        <option>Bug Report</option>
                                        <option>Compliment</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
                                    <textarea
                                        rows="4"
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-neutral-100 outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="Tell us what's on your mind..."
                                        required
                                        onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all font-bold">
                                    <Send className="w-4 h-4" /> Send Feedback
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12 bg-neutral-900/50 rounded-2xl border border-dashed border-neutral-800">
                            <MessageSquare className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-neutral-400 mb-2">No feedback yet</h3>
                            <p className="text-neutral-500 mb-6">Share your thoughts and help us improve!</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-lg shadow-blue-900/20"
                            >
                                Submit Your First Feedback
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Feedback;
