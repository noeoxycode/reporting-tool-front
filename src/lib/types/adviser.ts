export interface Adviser {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
    address: string;
    mobile: string;
    email: string;
    representativeNumber: string;
}

export type AdviserCreateInput = Omit<Adviser, 'id'>;
export type AdviserUpdateInput = Partial<Adviser>;
