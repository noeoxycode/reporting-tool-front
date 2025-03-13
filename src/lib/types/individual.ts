export interface Individual {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    address: string;
    email: string;
    phone: string;
    activeStatus: string;
    adviceStatus: string;
}

export type IndividualCreateInput = Omit<Individual, 'id'>;
export type IndividualUpdateInput = Partial<Individual>;
