'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Household} from "@/lib/types/household";
import {COLORS} from "@/app/theme";
import {deleteHousehold} from "@/lib/api/household";
import DeleteModal from "@/components/delete-confirmation-modal";
import {HomeIcon} from "lucide-react";
import Image from "next/image";

interface HouseholdCardProps {
    household: Household;
}

export default function HouseholdCard({household}: HouseholdCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (id: string) => {
        await deleteHousehold(id);
    };

    return (
        <>
            <div className={`bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow ${COLORS.border}`}>
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div
                            className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            {household.image ? (
                                <Image
                                    width={40}
                                    height={40}
                                    src={household.image}
                                    alt={household.name}
                                    className="h-10 w-10 rounded-full"
                                />
                            ) : (
                                <HomeIcon className="h-6 w-6 text-gray-400"/>
                            )}
                        </div>
                        <div>
                            <h3 className={`text-lg font-medium ${COLORS.text}`}>
                                {household.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{household.address}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/households/${household.id}`}
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium ${COLORS.text} bg-white border ${COLORS.border} rounded-md hover:bg-gray-50`}
                        >
                            View
                        </Link>
                        <Link
                            href={`/households/${household.id}/edit`}
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
                        <span className="font-medium text-gray-500">Advice Status:</span>{' '}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            household.adviceStatus === 'active' ? 'bg-green-100 text-green-800' :
                                household.adviceStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    household.adviceStatus === 'inactive' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                        }`}>
                            {household.adviceStatus ?? "Unknown"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Status:</span>{' '}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            household.activeStatus === 'active' ? 'bg-green-100 text-green-800' :
                                household.activeStatus === 'inactive' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                        }`}>
                            {household.activeStatus ?? "Unknown"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Anniversary:</span> {household.anniversary ? new Date(household.anniversary).toLocaleDateString() : 'N/A'}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Members:</span> {household.relations ? household.relations.length : 0}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    id={household.id}
                    name={household.name}
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    redirectAfterDelete="/households"
                    successMessage="Household"
                />
            )}
        </>
    );
}
