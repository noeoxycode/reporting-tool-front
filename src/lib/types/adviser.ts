import {IndividualAdviserRelation} from "@/lib/types/relations/individual-adviser-relation";

export interface Adviser {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
    address: string;
    mobile: string;
    email: string;
    representativeNumber: string;
    activeStatus: string;
    individualAdviserRelations: IndividualAdviserRelation[] | null;
}

export type AdviserCreateInput = Omit<Adviser, 'id'>;
export type AdviserUpdateInput = Partial<Adviser>;
