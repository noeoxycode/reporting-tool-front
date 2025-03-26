export interface Portfolio {
    id: string;
    name: string;
    activeStatus: string;
    adviceStatus: string;
    image: string | null;
}

export type PortfolioCreateInput = Omit<Portfolio, 'id'>;
export type PortfolioUpdateInput = Partial<Portfolio>;
