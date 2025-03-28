"use client";
import { useState } from "react";

export default function AddTweet({ onTweetPosted }) {
  const [content, setContent] = useState("");

  const handleTweet = async () => {
    const token = localStorage.getItem("token");
    if (!content || content.length > 280 || !token) return;

    const response = await fetch("http://localhost:3001/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, token }),
    });

    const data = await response.json();

    if (data.result) {
      setContent("");
      if (onTweetPosted) onTweetPosted();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="m-6 mb-4">
      <textarea
        placeholder="What's happening?"
        maxLength={280}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={1}
        className="w-full h-20 px-10 border border-gray-700 rounded-full resize-none bg-[#192734] text-white placeholder:text-gray-400 text-lg leading-[4.4] overflow-hidden focus:placeholder-transparent"
      />
      <div className="flex justify-between mx-10">
        <span className="text-base text-gray-400">{content.length}/280</span>
        <button
          onClick={handleTweet}
          className="mt-1 px-6 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg text-white font-bold text-xl tracking-wide rounded-full"
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
