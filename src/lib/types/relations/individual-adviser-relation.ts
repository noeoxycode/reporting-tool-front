import {Adviser} from "@/lib/types/adviser";
import {Individual} from "@/lib/types/individual";

export interface IndividualAdviserRelation {
    individualId: string;
    adviserId: string;
    adviser: Adviser | null;
    individual: Individual | null;
}
