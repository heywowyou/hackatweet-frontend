'use client';
import { useState } from 'react';

export default function Tweet({ tweet, onLike, onDelete }) {
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId');

    const [isLiked, setIsLiked] = useState(
        tweet.likes.some((user) => user._id === currentUserId)
    );
    const [likeCount, setLikeCount] = useState(tweet.likes.length);

    const handleLike = async () => {
        const response = await fetch(`http://localhost:3001/tweets/like/${tweet._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.result) {
            setIsLiked(!isLiked);
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
            if (onLike) onLike();
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this tweet?');
        if (!confirmed) return;

        const response = await fetch(`http://localhost:3001/tweets/${tweet._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.result && onDelete) {
            onDelete();
        }
    };

    const isAuthor = tweet.author._id.toString() === currentUserId;

    return (
        <div className="border border-gray-700 p-4 rounded shadow-sm">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <img
                        src={tweet.author.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                    <div>
                        <div className="font-semibold">@{tweet.author.username}</div>
                        <div className="mt-1">
                            {tweet.content.split(/(\s+)/).map((part, i) =>
                                part.startsWith('#') ? (
                                    <span key={i} className="text-blue-400 hover:underline cursor-pointer">
                                        {part}
                                    </span>
                                ) : (
                                    <span key={i}>{part}</span>
                                )
                            )}
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                            {new Date(tweet.date).toLocaleString()}
                        </div>
                    </div>
                </div>

                {isAuthor && (
                    <button
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-600 text-lg"
                        title="Delete tweet"
                    >
                        🗑️
                    </button>
                )}
            </div>

            <div className="mt-3 flex items-center gap-2">
                <button onClick={handleLike}>
                    {isLiked ? '❤️' : '🤍'}
                </button>
                <span className="text-sm text-gray-400">{likeCount}</span>
            </div>
        </div>
    );
}
