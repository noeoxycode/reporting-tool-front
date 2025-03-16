'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Adviser } from "@/lib/types/adviser";
import { COLORS } from "@/app/theme";
import { deleteAdviser } from "@/lib/api/adviser";
import DeleteModal from "@/components/delete-confirmation-modal";
import {UserIcon} from "lucide-react";

interface AdviserCardProps {
    adviser: Adviser;
}

export default function AdviserCard({ adviser }: AdviserCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (id: string) => {
        await deleteAdviser(id);
    };

    return (
        <>
            <div className={`bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow ${COLORS.border}`}>
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            {adviser.image ? (
                                <img
                                    src={adviser.image}
                                    alt={`${adviser.firstName} ${adviser.lastName}`}
                                    className="h-10 w-10 rounded-full"
                                />
                            ) : (
                                <UserIcon className="h-6 w-6 text-gray-400" />
                            )}
                        </div>
                        <div>
                            <h3 className={`text-lg font-medium ${COLORS.text}`}>
                                {adviser.firstName} {adviser.lastName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{adviser.email}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/advisers/${adviser.id}`}
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium ${COLORS.text} bg-white border ${COLORS.border} rounded-md hover:bg-gray-50`}
                        >
                            View
                        </Link>
                        <Link
                            href={`/advisers/${adviser.id}/edit`}
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white ${COLORS.button} border border-transparent rounded-md hover:${COLORS.buttonHover}`}
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                        <span className="font-medium text-gray-500">Mobile:</span> {adviser.mobile}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Representative Number:</span> {adviser.representativeNumber}
                    </div>
                    <div className="col-span-2">
                        <span className="font-medium text-gray-500">Address:</span> {adviser.address}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    id={adviser.id}
                    name={`${adviser.firstName} ${adviser.lastName}`}
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    redirectAfterDelete="/advisers"
                    successMessage="Adviser"
                />
            )}
        </>
    );
}
