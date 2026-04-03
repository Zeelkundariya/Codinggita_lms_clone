import React from 'react'
import Navbar from '../components/Navbar'

const ChatDashboard = () => {
    return (
        <>
            <Navbar />
            <div class="max-w-6xl mx-auto py-6">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold mb-1">Chat Groups</h1>
                    <p class="text-neutral-400 text-sm">Groups assigned to you and universal groups.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="text-neutral-400">No groups assigned to you yet.</div>
                </div>
            </div>
        </>
    )
}

export default ChatDashboard