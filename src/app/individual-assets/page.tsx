import Link from 'next/link';
import { getIndividualAssets } from "@/lib/api/individualAsset";
import { COLORS } from "@/app/theme";
import IndividualAssetCard from "@/components/individualAsset/individual-asset-card";

export const dynamic = 'force-dynamic';

export default async function IndividualAssetsPage() {
    const individualAssets = await getIndividualAssets();

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-2xl font-semibold ${COLORS.text}`}>All individualAssets</h1>
                    <Link
                        href="/individual-assets/new"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                    >
                        Add individualAsset
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {individualAssets.length === 0 ? (
                        <div className={`bg-white shadow rounded-lg p-6 text-center ${COLORS.border}` }>
                            <p className={COLORS.text}>No individualAsset found</p>
                            <Link
                                href="/individual-assets/new"
                                className={`inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                            >
                                Add your first individualAsset Asset
                            </Link>
                        </div>
                    ) : (
                        individualAssets.map((individualAsset) => (
                            <IndividualAssetCard key={individualAsset.id} individualAsset={individualAsset} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
