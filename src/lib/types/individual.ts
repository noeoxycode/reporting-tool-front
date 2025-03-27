import {IndividualAdviserRelation} from "@/lib/types/relations/individual-adviser-relation";
import {HouseholdIndividualRelation} from "@/lib/types/relations/household-individual-relation";

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
    individualAdviserRelation: IndividualAdviserRelation | null;
    householdIndividualRelations: HouseholdIndividualRelation[] | [];
}

export type IndividualCreateInput = Omit<Individual, 'id'>;
export type IndividualUpdateInput = Partial<Individual>;
