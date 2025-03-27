'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IndividualAsset } from "@/lib/types/individualAsset";
import { COLORS } from "@/app/theme";
import { deleteIndividualAsset } from "@/lib/api/individualAsset"; // Assuming this API method exists
import DeleteModal from "@/components/delete-confirmation-modal";

interface IndividualAssetCardProps {
    individualAsset: IndividualAsset;
}

export default function IndividualAssetCard({ individualAsset }: IndividualAssetCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (id: string) => {
        await deleteIndividualAsset(id);
    };

    return (
        <>
            <div className={`bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow ${COLORS.border}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`text-lg font-medium ${COLORS.text}`}>
                            {individualAsset.name}
                        </h3>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/individual-assets/${individualAsset.id}`}
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium ${COLORS.text} bg-white border ${COLORS.border} rounded-md hover:bg-gray-50`}
                        >
                            View
                        </Link>
                        <Link
                            href={`/individual-assets/${individualAsset.id}/edit`}
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
                        <span className="font-medium text-gray-500">Asset Type:</span> {individualAsset.type}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Tax Rate:</span> {individualAsset.taxRate}%
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Status:</span> {individualAsset.activeStatus}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Advice Status:</span> {individualAsset.adviceStatus}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    id={individualAsset.id}
                    name={`${individualAsset.type} Asset`}
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    redirectAfterDelete="/individual-assets"
                    successMessage="Individual Asset"
                />
            )}
        </>
    );
}
