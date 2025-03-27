import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-lg w-full space-y-8 text-center">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Page not found
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        The page you are looking for does not exist.
                    </p>
                </div>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Back to home page
                    </Link>
                </div>
            </div>
        </div>
    );
}
