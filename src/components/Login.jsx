'use client';

import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Login() {
    const [isSignUpOpen, setSignUpOpen] = useState(false);
    const [isSignInOpen, setSignInOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-gray-100 flex items-center justify-center">
                <img
                    src="../../../twitter-logo.png"
                    alt="Logo Hackatweet"
                />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center space-y-4">
                <h1 className="text-3xl font-bold">Welcome to Hackatweet</h1>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSignUpOpen(true)}>
                    Sign up
                </button>
                <button className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded" onClick={() => setSignInOpen(true)}>
                    Sign in
                </button>

                {isSignUpOpen && <SignUp onClose={() => setSignUpOpen(false)} />}
                {isSignInOpen && <SignIn onClose={() => setSignInOpen(false)} />}
            </div>
        </div>
    );
}
