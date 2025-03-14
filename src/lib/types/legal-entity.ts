export class LegalEntityType {
    static Trust = 'Trust';
    static SMSF = 'SMSF';
    static Company = 'Company';
    static Partnership = 'Partnership';

    static fromString(type: string): LegalEntityType | undefined {
        if (Object.values(LegalEntityType).includes(type as LegalEntityType)) {
            return type as LegalEntityType;
        }
        return undefined;
    }
}

export interface LegalEntity {
    id: string;
    name: string;
    type: LegalEntityType;
    legalName: string;
    abnAcn: string;
    corporateTrusteeName?: string;
    corporateTrusteeAbnAcn?: string;
    activeStatus: 'Active' | 'Inactive' | 'On Hold';
    adviceStatus: 'Advised' | 'Pending' | 'Not Required';
}

export type LegalEntityCreateInput = Omit<LegalEntity, 'id'>;
export type LegalEntityUpdateInput = Partial<LegalEntity>;