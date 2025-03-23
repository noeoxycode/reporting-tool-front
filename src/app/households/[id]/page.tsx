import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHousehold } from "@/lib/api/household";
import { getIndividual } from "@/lib/api/individual";
import { HomeIcon, PieChart } from "lucide-react";
import { COLORS } from "@/app/theme";
import OwnershipChart from "@/components/household/ownership-chart";

interface DetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function HouseholdDetailPage({ params }: DetailPageProps) {
    try {
        const paramsAwaited = await params;
        const household = await getHousehold(paramsAwaited.id);

        const individualPromises = household.relations.map(relation =>
            getIndividual(relation.individualId)
        );

        const individuals = await Promise.all(individualPromises);

        const ownershipData = household.relations.map((relation, index) => ({
            name: `${individuals[index].firstName} ${individuals[index].lastName}`,
            value: relation.ownershipPercentage,
            individualId: relation.individualId
        }));

        const COLORS_ARRAY = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

        const formatDate = (dateString: string | null | undefined): string => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="mb-6">
                        <Link href="/households">
                            &larr; Back to list
                        </Link>
                        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                            {household.name}
                        </h1>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Detailed Information
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Household details and owner information.
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/households/${household.id}/edit`}
                                    className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                {household.image && (
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Photo</dt>
                                        <HomeIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                )}
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {household.name}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {household.address}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Anniversary Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {formatDate(household.anniversary)}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                <PieChart className="h-5 w-5 mr-2" />
                                Ownership Distribution
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Ownership percentage among different individuals.
                            </p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-4">
                            <OwnershipChart
                                ownershipData={ownershipData}
                                colorsArray={COLORS_ARRAY}
                            />
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Owners
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Details of individuals associated with this household.
                            </p>
                        </div>
                        <div className="border-t border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                {household.relations.map((relation, index) => (
                                    <li key={relation.id} className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                                    {(
                                                        <span className="text-lg font-semibold">
                                        {individuals[index].firstName.charAt(0)}{individuals[index].lastName.charAt(0)}
                                    </span>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <Link
                                                        href={`/individuals/${individuals[index].id}`}
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        {individuals[index].firstName} {individuals[index].lastName}
                                                    </Link>
                                                    <div className="text-sm text-gray-500">
                                                        {relation.ownershipPercentage}% ownership
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                            <span
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                style={{
                                    backgroundColor: `${COLORS_ARRAY[index % COLORS_ARRAY.length]}20`,
                                    color: COLORS_ARRAY[index % COLORS_ARRAY.length]
                                }}
                            >
                                {relation.ownershipPercentage}%
                            </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching household data:", error);
        return notFound();
    }
}
