"use client";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
dayjs.extend(relativeTime);

export default function Tweet({ tweet, onLike, onDelete }) {
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(
    tweet.likes.some((user) => user._id === currentUserId)
  );
  const [likeCount, setLikeCount] = useState(tweet.likes.length);

  const handleLike = async () => {
    const response = await fetch(
      `http://localhost:3001/tweets/like/${tweet._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    const data = await response.json();

    if (data.result) {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      if (onLike) onLike();
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this tweet?");
    if (!confirmed) return;

    const response = await fetch(`http://localhost:3001/tweets/${tweet._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (data.result && onDelete) {
      onDelete();
    }
  };

  const isAuthor = tweet.author._id.toString() === currentUserId;

  return (
    <div className="border border-gray-700 px-6 py-4 rounded-3xl shadow-sm">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div
            className="flex gap-3 cursor-pointer"
            onClick={() => router.push(`/profile/${tweet.author.username}`)}
          >
            <img
              src={tweet.author.avatar || "/oeuf.jpg"}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border border-gray-800"
            />
            <div>
              <div className="font-semibold text-lg">
                @{tweet.author.username}
              </div>
              <div className="mt-1 text-lg">
                {tweet.content.split(/(\s+)/).map((part, i) =>
                  part.startsWith("#") ? (
                    <span
                      key={i}
                      className="text-blue-400 hover:underline cursor-pointer"
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {isAuthor && (
          <button
            onClick={handleDelete}
            className="mr-4 text-red-400 hover:text-red-600 text-lg"
            title="Delete tweet"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        )}
      </div>

      <div className="mt-3 ml-5.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={handleLike}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-xl transition-colors ${
                isLiked ? "text-red-500" : "text-white"
              } hover:text-red-400`}
            />
          </button>
          <span className="text-sm text-gray-400">{likeCount}</span>
        </div>
        <div className="text-sm text-gray-500 pr-4">
          {dayjs(tweet.date).fromNow()}
        </div>
      </div>
    </div>
  );
}
