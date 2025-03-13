import Link from 'next/link';
import IndividualCard from "@/components/individual/IndividualCard";
import { getIndividuals } from "@/lib/api/individual";
import { COLORS } from "@/app/theme";

export const dynamic = 'force-dynamic'; // Pour s'assurer que la page est toujours à jour

export default async function IndividualsPage() {
    const individuals = await getIndividuals();

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-2xl font-semibold ${COLORS.text}`}>Tous les individuals</h1>
                    <Link
                        href="/individuals/new"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                    >
                        Add individual
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {individuals.length === 0 ? (
                        <div className={`bg-white shadow rounded-lg p-6 text-center ${COLORS.border}` }>
                            <p className={COLORS.text}>Aucun individual trouvé</p>
                            <Link
                                href="/individuals/new"
                                className={`inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                            >
                                Add your first individual
                            </Link>
                        </div>
                    ) : (
                        individuals.map((individual) => (
                            <IndividualCard key={individual.id} individual={individual} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
