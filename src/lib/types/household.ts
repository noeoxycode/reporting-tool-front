import {HouseholdIndividualRelation} from "@/lib/types/relations/household-individual-relation";

export interface Household {
    id: string;
    name: string;
    image: string | null;
    address: string;
    activeStatus: string;
    adviceStatus: string;
    anniversary: string;
    relations: HouseholdIndividualRelation[];
}

export type HouseholdCreateInput = Omit<Household, 'id'>;
export type HouseholdUpdateInput = Partial<Household>;
