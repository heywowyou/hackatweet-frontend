'use client';
import { useEffect, useState } from 'react';

export default function LastTweets() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/tweets')
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  }, []);

  return (
    <div className="space-y-4">
      {tweets.length === 0 ? (
        <p className="text-gray-500">No tweets found.</p>
      ) : (
        tweets.map((tweet) => (
          <div key={tweet._id} className="border p-4 rounded shadow-sm">
            <div className="font-semibold">@{tweet.author.username}</div>
            <div className="mt-1">{tweet.content}</div>
            <div className="text-sm text-gray-400 mt-2">
              {new Date(tweet.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
