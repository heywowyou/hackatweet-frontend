'use client';
import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Login() {
    const [isSignUpOpen, setSignUpOpen] = useState(false);
    const [isSignInOpen, setSignInOpen] = useState(false);

    return (
        <div className="flex h-screen w-full font-['Verdana']">
            {/* LEFT SECTION */}
            <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('/bg-left.png')" }}>
            </div>

            {/* RIGHT SECTION */}
            <div className="w-1/2 bg-[#15202B] text-white flex flex-col justify-center items-start px-16 space-y-6">
                <img src="/logo.png" className="w-10 mb-4" alt="Mini Logo" />
                <h1 className="text-6xl font-bold leading-snug">See what’s<br />happening</h1>
                <p className="text-2xl font-semibold">Join Hackatweet today.</p>

                <button
                    onClick={() => setSignUpOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full text-lg"
                >
                    Sign up
                </button>

                <div className="text-sm">
                    Already have an account?{' '}
                    <button
                        onClick={() => setSignInOpen(true)}
                        className="text-blue-400 hover:underline ml-1"
                    >
                        Sign in
                    </button>
                </div>

                {isSignUpOpen && <SignUp onClose={() => setSignUpOpen(false)} />}
                {isSignInOpen && <SignIn onClose={() => setSignInOpen(false)} />}
            </div>
        </div>
    );
}
