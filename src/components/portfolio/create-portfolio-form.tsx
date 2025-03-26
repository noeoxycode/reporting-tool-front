'use client';

import { useRouter } from 'next/navigation';
import { PortfolioCreateInput } from "@/lib/types/portfolio";
import { createPortfolio } from "@/lib/api/portfolio";
import PortfolioForm from "@/components/portfolio/portfolio-form";

export default function CreateForm() {
    const router = useRouter();

    const handleSubmit = async (data: PortfolioCreateInput) => {
        console.log(data);
        await createPortfolio(data);
        router.push('/portfolios');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Add a New Portfolio</h2>
            <PortfolioForm onSubmit={handleSubmit} buttonText="Create" />
        </div>
    );
}
