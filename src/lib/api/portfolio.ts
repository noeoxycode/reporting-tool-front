import {Portfolio, PortfolioCreateInput, PortfolioUpdateInput} from "@/lib/types/portfolio";

export async function getPortfolios(): Promise<Portfolio[]> {
    const res = await fetch('http://127.0.0.1:3000/portfolios');
    if (!res.ok) {
        throw new Error('Error while getting portfolios');
    }
    return res.json();
}

export async function getPortfolio(id: string): Promise<Portfolio> {
    const res = await fetch(`http://127.0.0.1:3000/portfolio/${id}`);
    if (!res.ok) {
        throw new Error(`Error while getting portfolio ${id}`);
    }
    return res.json();
}

export async function createPortfolio(data: PortfolioCreateInput): Promise<Portfolio> {
    const res = await fetch('http://127.0.0.1:3000/portfolio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('Error while creating portfolio');
    }
    return res.json();
}

export async function updatePortfolio(id: string, data: PortfolioUpdateInput): Promise<void> {
    const res = await fetch(`http://127.0.0.1:3000/portfolio/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Error while updating portfolio ${id}`);
    }
}

export async function deletePortfolio(id: string): Promise<void> {
    const res = await fetch(`http://127.0.0.1:3000/portfolio/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Error while deleting portfolio ${id}`);
    }
}
