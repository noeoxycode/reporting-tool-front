import Link from 'next/link';
import { notFound } from 'next/navigation';
import {getIndividual} from "@/lib/api/individual";
import {COLORS} from "@/app/theme";
import {UserIcon} from "lucide-react";

interface DetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function IndividualDetailPage(props: DetailPageProps) {
    const params = await props.params;
    try {
        const individual = await getIndividual(params.id);
        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="mb-6">
                        <Link
                            href="/individuals"
                        >
                            &larr; Back to the list
                        </Link>
                        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                            {individual.firstName} {individual.lastName}
                        </h1>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Detailed Information
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Personal details and contact information
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/individuals/${individual.id}/edit`}
                                    className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                                >
                                    Modifiy
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {individual.firstName} {individual.lastName}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Birthdate</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {individual.dob}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {individual.gender}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {individual.email}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {individual.phone}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {individual.address}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Activity status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        individual.activeStatus === 'active'
                            ? 'bg-green-100 text-green-800'
                            : individual.activeStatus === 'inactive'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {individual.activeStatus}
                    </span>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Advice status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        individual.adviceStatus === 'Advised'
                            ? 'bg-blue-100 text-blue-800'
                            : individual.adviceStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}>
                      {individual.adviceStatus}
                    </span>
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Adviser</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {individual.individualAdviserRelation?.adviser ? (
                                            <a
                                                href={`/advisers/${individual.individualAdviserRelation.adviser.id}`}
                                                className="hover:underline hover:text-blue-600 transition-colors duration-200 cursor-pointer font-medium"
                                            >
                                                {`${individual.individualAdviserRelation.adviser.firstName} ${individual.individualAdviserRelation.adviser.lastName}`}
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 italic">No adviser assigned</span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {individual.householdIndividualRelations && individual.householdIndividualRelations.length > 0 && (
                        <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Household Ownership
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Households where this individual has an ownership share
                                </p>
                            </div>
                            <div className="border-t border-gray-200">
                                <ul className="divide-y divide-gray-200">
                                    {individual.householdIndividualRelations.map((relation) => (
                                        <li key={relation.id} className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    {relation.household?.image ? (
                                                        <img
                                                            src={relation.household.image}
                                                            alt={relation.household.name}
                                                            className="h-10 w-10 rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <UserIcon className="h-6 w-6 text-gray-400"/>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <Link
                                                            href={`/households/${relation.householdId}`}
                                                            className="text-sm font-medium text-gray-900 hover:underline"
                                                        >
                                                            {relation.household?.name || 'Unnamed Household'}
                                                        </Link>
                                                        <p className="text-sm text-gray-500">
                                                            Ownership: {relation.ownershipPercentage}%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        relation.household?.activeStatus === 'active'
                                                            ? 'bg-green-100 text-green-800'
                                                            : relation.household?.activeStatus === 'inactive'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {relation.household?.activeStatus}
                                                    </span>
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        relation.household?.adviceStatus === 'Advised'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : relation.household?.adviceStatus === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {relation.household?.adviceStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    } catch {
        return notFound();
    }
}
