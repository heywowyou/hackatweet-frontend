"use client";
import { useState } from "react";

export default function SignUp({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();

    if (data.result) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId", data.userId);
      window.location.href = "/home";
    } else {
      alert("Erreur : " + data.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#15202B] p-8 rounded-xl shadow-lg w-[90%] max-w-md relative text-white">
        <button
          className="absolute top-3 right-4 text-white text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <img src="/logo.png" className="w-8 mx-auto mb-4" alt="Logo" />
        <h2 className="text-2xl font-bold text-center mb-4">
          Create your Hackatweet account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#192734] border border-gray-600 text-white px-4 py-2 rounded placeholder-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#192734] border border-gray-600 text-white px-4 py-2 rounded placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#192734] border border-gray-600 text-white px-4 py-2 rounded placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="bg-white text-black py-2 rounded font-semibold hover:bg-gray-200"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
