import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getGoal} from "@/lib/api/goal";
import {TargetIcon} from "lucide-react";
import {COLORS} from "@/app/theme";

interface DetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function GoalDetailPage({params}: DetailPageProps) {
    try {
        const paramsAwaited = await params;
        const goal = await getGoal(paramsAwaited.id);

        // Format dates for display
        const formattedStartDate = new Date(goal.startDate).toLocaleDateString();
        const formattedTargetDate = new Date(goal.targetDate).toLocaleDateString();

        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="mb-6">
                        <Link
                            href="/goals"
                        >
                            &larr; Back to the list
                        </Link>
                        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                            {goal.name}
                        </h1>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Goal Details
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Financial goal information and progress.
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/goals/${goal.id}/edit`}
                                    className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                                >
                                    Modify
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                {goal.image && (
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Image</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <img src={goal.image} alt={goal.name} className="h-16 w-16 rounded-full" />
                                        </dd>
                                    </div>
                                )}
                                {!goal.image && (
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Image</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <TargetIcon className="h-6 w-6 text-gray-400"/>
                                        </dd>
                                    </div>
                                )}
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Goal Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {goal.name}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Goal Type</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {goal.type}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {formattedStartDate}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Target Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {formattedTargetDate}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Target Amount</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        ${goal.amount.toLocaleString()}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Priority</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {goal.priority}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Active Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                goal.activeStatus === 'Active' ? 'bg-green-100 text-green-800' :
                                                    goal.activeStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {goal.activeStatus ?? "Unknown"}
                                        </span>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Advice Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                goal.adviceStatus === 'Received' ? 'bg-green-100 text-green-800' :
                                                    goal.adviceStatus === 'Needed' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {goal.adviceStatus ?? "Unknown"}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return notFound();
    }
}
