import {Household} from "@/lib/types/household";

export interface HouseholdIndividualRelation {
    id: string;
    householdId: string;
    individualId: string;
    ownershipPercentage: number;
    household: Household | null;
}
