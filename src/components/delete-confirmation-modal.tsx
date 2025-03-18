'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteModalProps {
    id: string;
    name: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: (id: string) => Promise<void>;
    redirectAfterDelete?: string;
    errorMessage?: string;
    successMessage: string;
}

export default function DeleteModal({
                                        id,
                                        name,
                                        isOpen,
                                        onClose,
                                        onDelete,
                                        redirectAfterDelete,
                                        errorMessage = 'An error occurred',
                                        successMessage,
                                    }: DeleteModalProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await onDelete(id);
            if (redirectAfterDelete) {
                router.push(redirectAfterDelete);
            }
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : errorMessage);
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Delete {successMessage}</h3>

                <p className="mb-4">
                    Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
                </p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
