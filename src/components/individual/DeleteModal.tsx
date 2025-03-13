// app/components/individuals/DeleteModal.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteIndividual } from "@/lib/api/individual";

interface DeleteModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

export default function DeleteModal({ id, name, onClose }: DeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await deleteIndividual(id);
            onClose();
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-medium text-gray-900">
                    Confirm Deletion
                </h3>

                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Are you sure you want to delete the individual {name}? This action is irreversible.
                    </p>
                </div>

                {error && (
                    <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="mt-4 flex space-x-3 justify-end">
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onClose}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={handleDelete}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
