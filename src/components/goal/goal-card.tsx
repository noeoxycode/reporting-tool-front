'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Goal} from "@/lib/types/goal";
import {COLORS} from "@/app/theme";
import {deleteGoal} from "@/lib/api/goal";
import DeleteModal from "@/components/delete-confirmation-modal";
import {TargetIcon} from "lucide-react";

interface GoalCardProps {
    goal: Goal;
}

export default function GoalCard({goal}: GoalCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (id: string) => {
        await deleteGoal(id);
    };

    const formattedStartDate = new Date(goal.startDate).toLocaleDateString();
    const formattedTargetDate = new Date(goal.targetDate).toLocaleDateString();

    return (
        <>
            <div className={`bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow ${COLORS.border}`}>
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div
                            className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            {goal.image ? (
                                <img
                                    src={goal.image}
                                    alt={goal.name}
                                    className="h-10 w-10 rounded-full"
                                />
                            ) : (
                                <TargetIcon className="h-6 w-6 text-gray-400"/>
                            )}
                        </div>
                        <div>
                            <h3 className={`text-lg font-medium ${COLORS.text}`}>
                                {goal.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{goal.type}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/goals/${goal.id}`}
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium ${COLORS.text} bg-white border ${COLORS.border} rounded-md hover:bg-gray-50`}
                        >
                            View
                        </Link>
                        <Link
                            href={`/goals/${goal.id}/edit`}
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
                        <span className="font-medium text-gray-500">Start Date:</span> {formattedStartDate}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Target Date:</span> {formattedTargetDate}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Amount:</span> ${goal.amount.toLocaleString()}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Priority:</span> {goal.priority}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Status:</span>{' '}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            goal.activeStatus === 'Active' ? 'bg-green-100 text-green-800' :
                                goal.activeStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                        }`}>
                            {goal.activeStatus ?? "Unknown"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Advice Status:</span>{' '}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            goal.adviceStatus === 'Received' ? 'bg-green-100 text-green-800' :
                                goal.adviceStatus === 'Needed' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                        }`}>
                            {goal.adviceStatus ?? "Unknown"}
                        </span>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    id={goal.id}
                    name={goal.name}
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    redirectAfterDelete="/goals"
                    successMessage="Goal"
                />
            )}
        </>
    );
}
