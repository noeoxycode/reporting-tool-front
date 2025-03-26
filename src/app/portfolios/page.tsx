import Link from 'next/link';
import { getPortfolios } from "@/lib/api/portfolio";
import { COLORS } from "@/app/theme";
import PortfolioCard from "@/components/portfolio/portfolio-card";

export const dynamic = 'force-dynamic';

export default async function PortfoliosPage() {
    const portfolios = await getPortfolios();

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-2xl font-semibold ${COLORS.text}`}>All portfolios</h1>
                    <Link
                        href="/portfolios/new"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                    >
                        Add portfolio
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {portfolios.length === 0 ? (
                        <div className={`bg-white shadow rounded-lg p-6 text-center ${COLORS.border}` }>
                            <p className={COLORS.text}>No portfolio found</p>
                            <Link
                                href="/portfolios/new"
                                className={`inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                            >
                                Add your first portfolio
                            </Link>
                        </div>
                    ) : (
                        portfolios.map((portfolio) => (
                            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
