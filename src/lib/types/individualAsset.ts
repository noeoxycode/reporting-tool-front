import {IndividualAdviserRelation} from "@/lib/types/relations/individual-adviser-relation";
import {HouseholdIndividualRelation} from "@/lib/types/relations/household-individual-relation";

export interface IndividualAsset {
    id: string;
    name: string;
    type: string;
    activeStatus: string;
    adviceStatus: string;
    taxRate: number;
}

export type IndividualAssetCreateInput = Omit<IndividualAsset, 'id'>;
export type IndividualAssetUpdateInput = Partial<IndividualAsset>;
