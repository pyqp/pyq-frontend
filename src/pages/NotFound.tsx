import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <AlertCircle className="h-24 w-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center"
      >
        <Home className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;