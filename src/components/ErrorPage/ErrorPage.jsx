import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-9xl font-extrabold text-gray-300 mb-4">404</h1>
            <h2 className="text-5xl font-bold mb-2">Oops! Page not found.</h2>
            <p className="text-gray-600 mb-6 text-center text-2xl">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;