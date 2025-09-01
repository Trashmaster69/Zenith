import React, { useState } from 'react';
import type { UserCredentials } from '../types';

interface AuthProps {
    onLogin: (credentials: UserCredentials) => boolean;
    onSignup: (credentials: UserCredentials) => boolean;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onSignup }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!username.trim() || !password.trim()) {
            setError('Username and password cannot be empty.');
            return;
        }

        let success = false;
        if (isLoginView) {
            success = onLogin({ username, password });
            if (!success) {
                setError('Invalid username or password.');
            }
        } else {
            success = onSignup({ username, password });
            if (!success) {
                setError('Username already taken.');
            }
        }

        if (!success) {
            setPassword('');
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError(null);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center items-center gap-2 mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    <h1 className="text-4xl font-bold text-neutral">Zenith</h1>
                </div>

                <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full">
                    <div className="flex border-b border-gray-200 mb-6">
                        <button onClick={() => isLoginView ? null : toggleView()} className={`w-1/2 py-3 text-center font-semibold transition-colors ${isLoginView ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-neutral'}`}>
                            Login
                        </button>
                        <button onClick={() => !isLoginView ? null : toggleView()} className={`w-1/2 py-3 text-center font-semibold transition-colors ${!isLoginView ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-neutral'}`}>
                            Sign Up
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-neutral mb-1 text-center">{isLoginView ? 'Welcome Back!' : 'Create Your Account'}</h2>
                    <p className="text-gray-500 mb-6 text-center">{isLoginView ? 'Log in to track your habits.' : 'Sign up to start your journey.'}</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="zenith_seeker"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div className="pt-2">
                             <button type="submit" className="w-full py-3 px-4 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all shadow-sm text-lg">
                                {isLoginView ? 'Login' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
