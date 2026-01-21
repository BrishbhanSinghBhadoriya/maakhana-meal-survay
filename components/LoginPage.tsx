'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { Utensils, Heart, Star } from 'lucide-react';

const LoginPage = () => {
    const { signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError(null);
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Failed to sign in. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center px-4 py-8">

            {/* Logo at top - small */}
            <div className="mb-8">
                <Image
                    src="/maa_khaana.png"
                    alt="MaaKhana Logo"
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-md"
                />
            </div>

            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">

                {/* Left Side - Purpose & Branding */}
                <div className="text-center md:text-left order-2 md:order-1">
                    <h1 className="text-5xl md:text-6xl font-bold text-orange-600 mb-4">
                        MaaKhana
                    </h1>
                    <p className="text-2xl text-gray-700 mb-6 font-medium">
                        Home-style meals, delivered fresh
                    </p>

                    {/* Purpose Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200 mb-6">
                        <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 fill-orange-500" />
                            Why This Survey?
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We want to create the perfect meal experience for you! Through this survey, we'll learn about your favorite dishes.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Based on your preferences, we'll customize our weekly menu to ensure you get exactly what you love, every single day!
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-700">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <Utensils className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="font-medium">Personalized meal recommendations</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <Heart className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="font-medium">Made with love, just like home</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Card */}
                <div className="order-1 md:order-2">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-orange-100 relative overflow-hidden">
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-30 -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-300 to-amber-200 rounded-full blur-3xl opacity-20 -z-10"></div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome Back!</h2>
                            <p className="text-gray-600 text-lg">
                                Sign in to start sharing your meal preferences
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Google Sign-In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-xl px-6 py-4 font-semibold text-gray-700 hover:bg-gray-50 hover:border-orange-500 hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-lg">Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span className="text-lg group-hover:text-orange-600 transition-colors">Continue with Google</span>
                                </>
                            )}
                        </button>

                        {/* Info Box */}
                        <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                            <p className="text-sm text-gray-700 text-center leading-relaxed">
                                <span className="font-semibold text-orange-600">Quick & Easy:</span> Just 3 simple steps to share your breakfast, lunch, and dinner preferences
                            </p>
                        </div>

                        {/* Privacy Note */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-xs text-gray-500 text-center leading-relaxed">
                                🔒 Your information is secure. We only use your email to personalize your meal experience.
                            </p>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Delivering across <span className="font-semibold text-orange-600">Delhi NCR</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            Fresh, nutritious, and made with love 🧡
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
