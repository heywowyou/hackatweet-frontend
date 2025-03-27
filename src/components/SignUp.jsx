'use client';

import { useState } from 'react';

export default function SignUp({ onClose }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ⚠️ À adapter avec l'URL réelle du backend plus tard
        const response = await fetch('http://localhost:3001/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (data.result) {
            localStorage.setItem('token', data.token);
            window.location.href = '/home';
        } else {
            alert('Erreur : ' + data.error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
                <button className="absolute top-2 right-3 text-gray-500" onClick={onClose}>✕</button>
                <h2 className="text-xl font-semibold mb-4">Create your account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}
