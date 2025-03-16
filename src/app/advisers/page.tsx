import Link from 'next/link';
import { getAdvisers } from "@/lib/api/adviser";
import { COLORS } from "@/app/theme";
import AdviserCard from "@/components/adviser/adviser-card";

export const dynamic = 'force-dynamic'; // Pour s'assurer que la page est toujours à jour

export default async function AdvisersPage() {
    const advisers = await getAdvisers();

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-2xl font-semibold ${COLORS.text}`}>All advisers</h1>
                    <Link
                        href="/advisers/new"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                    >
                        Add adviser
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {advisers.length === 0 ? (
                        <div className={`bg-white shadow rounded-lg p-6 text-center ${COLORS.border}` }>
                            <p className={COLORS.text}>No adviser found</p>
                            <Link
                                href="/advisers/new"
                                className={`inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                            >
                                Add your first adviser
                            </Link>
                        </div>
                    ) : (
                        advisers.map((adviser) => (
                            <AdviserCard key={adviser.id} adviser={adviser} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
