import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getAdviser} from "@/lib/api/adviser";
import {UserIcon} from "lucide-react";
import {COLORS} from "@/app/theme";


interface DetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AdviserDetailPage({params}: DetailPageProps) {
    try {
        const paramsAwaited = await params;
        const adviser = await getAdviser(paramsAwaited.id);

        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="mb-6">
                        <Link
                            href="/advisers"
                        >
                            &larr; Back to the list
                        </Link>
                        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                            {adviser.firstName} {adviser.lastName}
                        </h1>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Detailed Information
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Professional details and contact information.
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/advisers/${adviser.id}/edit`}
                                    className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                                >
                                    Modify
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                {adviser.image && (
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Photo</dt>
                                        <UserIcon className="h-6 w-6 text-gray-400"/>
                                    </div>
                                )}
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {adviser.firstName} {adviser.lastName}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Representative Number</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {adviser.representativeNumber}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {adviser.email}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Mobile Phone</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {adviser.mobile}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {adviser.address}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span
                                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                                        adviser.activeStatus === 'Active' ? 'bg-green-100 text-green-800' :
                                                                            adviser.activeStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                                                                                'bg-yellow-100 text-yellow-800'
                                                                    }`}>
                            {adviser.activeStatus ?? "Unknown"}
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
