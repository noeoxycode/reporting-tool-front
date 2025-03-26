import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getPortfolio} from "@/lib/api/portfolio";
import {FileIcon} from "lucide-react";
import {COLORS} from "@/app/theme";

interface DetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PortfolioDetailPage({params}: DetailPageProps) {
    try {
        const paramsAwaited = await params;
        const portfolio = await getPortfolio(paramsAwaited.id);

        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="mb-6">
                        <Link
                            href="/portfolios"
                        >
                            &larr; Back to the list
                        </Link>
                        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                            {portfolio.name}
                        </h1>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Portfolio Details
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Comprehensive portfolio information
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/portfolios/${portfolio.id}/edit`}
                                    className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                                >
                                    Modify
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                {portfolio.image && (
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Portfolio Image</dt>
                                        <FileIcon className="h-6 w-6 text-gray-400"/>
                                    </div>
                                )}
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Portfolio Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {portfolio.name}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Active Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                portfolio.activeStatus === 'Active' ? 'bg-green-100 text-green-800' :
                                                    portfolio.activeStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {portfolio.activeStatus ?? "Unknown"}
                                        </span>
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Advice Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                portfolio.adviceStatus === 'Advised' ? 'bg-blue-100 text-blue-800' :
                                                    portfolio.adviceStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {portfolio.adviceStatus ?? "Not Specified"}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch {
        return notFound();
    }
}
