import Link from 'next/link';
import { getHouseholds } from "@/lib/api/household";
import { COLORS } from "@/app/theme";
import HouseholdCard from "@/components/household/household-card";

export const dynamic = 'force-dynamic';

export default async function HouseholdsPage() {
    const households = await getHouseholds();

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-2xl font-semibold ${COLORS.text}`}>All households</h1>
                    <Link
                        href="/households/new"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                    >
                        Add household
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {households.length === 0 ? (
                        <div className={`bg-white shadow rounded-lg p-6 text-center ${COLORS.border}` }>
                            <p className={COLORS.text}>No household found</p>
                            <Link
                                href="/households/new"
                                className={`inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                            >
                                Add your first household
                            </Link>
                        </div>
                    ) : (
                        households.map((household) => (
                            <HouseholdCard key={household.id} household={household} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
