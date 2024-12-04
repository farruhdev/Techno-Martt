export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-xl text-gray-700 mt-4">Oops! Page not found.</p>
                <p className="text-gray-500 mt-2">
                    The page you are looking for does not exist or has been moved.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}