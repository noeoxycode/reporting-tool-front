'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Individual } from "@/lib/types/individual";
import { COLORS } from "@/app/theme";
import {deleteIndividual} from "@/lib/api/individual";
import DeleteModal from "@/components/delete-confirmation-modal";

interface IndividualCardProps {
    individual: Individual;
}

export default function IndividualCard({ individual }: IndividualCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (id: string) => {
        await deleteIndividual(id);
    };


    return (
        <>
            <div className={`bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow ${COLORS.border}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`text-lg font-medium ${COLORS.text}`}>
                            {individual.firstName} {individual.lastName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{individual.email}</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/individuals/${individual.id}`}
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium ${COLORS.text} bg-white border ${COLORS.border} rounded-md hover:bg-gray-50`}
                        >
                            View
                        </Link>
                        <Link
                            href={`/individuals/${individual.id}/edit`}
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
                        <span className="font-medium text-gray-500">Phone:</span> {individual.phone}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Date of Birth:</span> {individual.dob}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Status:</span> {individual.activeStatus}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Advice:</span> {individual.adviceStatus}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    id={individual.id}
                    name={`${individual.firstName} ${individual.lastName}`}
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    redirectAfterDelete="/individuals"
                    successMessage="Individual"
                />
            )}
        </>
    );
}
