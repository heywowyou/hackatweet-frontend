"use client";
import { useState, useEffect } from "react";
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

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLiked(tweet.likes.some((user) => user._id === currentUserId));
    setLikeCount(tweet.likes.length);
  }, [tweet, currentUserId]);

  const handleLike = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/like/${tweet._id}`,
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

  const confirmDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/${tweet._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );
    const data = await response.json();
    setShowModal(false);
    if (data.result && onDelete) {
      onDelete();
    }
  };

  const isAuthor = tweet.author._id.toString() === currentUserId;

  return (
    <>
      <div className="border border-gray-700 p-4 rounded-3xl shadow-sm">
        <div className="flex justify-between">
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

          {isAuthor && (
            <button
              onClick={() => setShowModal(true)}
              className="text-red-400 hover:text-red-600 text-lg"
              title="Delete tweet"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          )}
        </div>

        <div className="mt-3 ml-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={handleLike}>
              <FontAwesomeIcon
                icon={faHeart}
                className={`text-xl transition-colors ${isLiked ? "text-red-500" : "text-white"
                  } hover:text-red-400`}
              />
            </button>
            <span className="text-sm text-gray-400">{likeCount}</span>
          </div>
          <div className="text-sm text-gray-500">
            {dayjs(tweet.date).fromNow()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#15202B] p-6 rounded-xl text-white w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">Delete this tweet?</h2>
            <p className="mb-6 text-gray-300">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
