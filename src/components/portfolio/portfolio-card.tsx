'use client';

import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {UserIcon} from "lucide-react";
import {COLORS} from "@/app/theme";
import DeleteModal from "@/components/delete-confirmation-modal";
import {deletePortfolio} from "@/lib/api/portfolio";

interface Portfolio {
    id: string;
    name: string;
    activeStatus: string;
    adviceStatus: string;
    image: string | null;
}

interface PortfolioCardProps {
    portfolio: Portfolio;
}

export default function PortfolioCard({portfolio}: PortfolioCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (id: string) => {
        await deletePortfolio(id);
    };

    return (
        <>
            <div className={`bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow ${COLORS.border}`}>
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div
                            className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            {portfolio.image ? (
                                <Image
                                    width={40}
                                    height={40}
                                    src={portfolio.image}
                                    alt={portfolio.name}
                                    className="h-10 w-10 rounded-full"
                                />
                            ) : (
                                <UserIcon className="h-6 w-6 text-gray-400"/>
                            )}
                        </div>
                        <div>
                            <h3 className={`text-lg font-medium ${COLORS.text}`}>
                                {portfolio.name}
                            </h3>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/portfolios/${portfolio.id}`}
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium ${COLORS.text} bg-white border ${COLORS.border} rounded-md hover:bg-gray-50`}
                        >
                            View
                        </Link>
                        <Link
                            href={`/portfolios/${portfolio.id}/edit`}
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
                        <span className="font-medium text-gray-500">Active Status:</span>{' '}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            portfolio.activeStatus === 'Active' ? 'bg-green-100 text-green-800' :
                                portfolio.activeStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                        }`}>
                            {portfolio.activeStatus ?? "Unknown"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Advice Status:</span>{' '}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            portfolio.adviceStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                                portfolio.adviceStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                        }`}>
                            {portfolio.adviceStatus ?? "Unknown"}
                        </span>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    id={portfolio.id}
                    name={portfolio.name}
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    redirectAfterDelete="/portfolios"
                    successMessage="Portfolio"
                />
            )}
        </>
    );
}
