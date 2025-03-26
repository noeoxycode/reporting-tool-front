'use client';

import { useRouter } from 'next/navigation';
import { Portfolio, PortfolioCreateInput } from "@/lib/types/portfolio";
import { updatePortfolio } from "@/lib/api/portfolio";
import PortfolioForm from "@/components/portfolio/portfolio-form";

interface UpdateFormProps {
    portfolio: Portfolio;
}

export default function UpdateForm({ portfolio }: UpdateFormProps) {
    const router = useRouter();

    const handleSubmit = async (data: PortfolioCreateInput) => {
        await updatePortfolio(portfolio.id, data);
        router.push('/portfolios');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Modify portfolio</h2>
            <PortfolioForm
                initialData={portfolio}
                onSubmit={handleSubmit}
                buttonText="Modify"
            />
        </div>
    );
}
