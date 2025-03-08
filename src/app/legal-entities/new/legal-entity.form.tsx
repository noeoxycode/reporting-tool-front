'use client';

import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {LabelAndInput} from '@/components/ui/label-and-input';
import EntityForm from '@/components/ui/entity-form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {bool} from "sharp";

enum LegalEntityType {
    Trust = 'Trust',
    SMSF = 'SMSF',
    Company = 'Company',
    Partnership = 'Partnership',
}

interface LegalEntity {
    name: string;
    type: string;
    legalName: string;
    abnAcn: string;
    corporateTrusteeName: string;
    corporateTrusteeAbnAcn: string;
}

export default function LegalEntityForm() {
    const [formData, setFormData] = useState<LegalEntity>({
        name: '',
        type: '',
        legalName: '',
        abnAcn: '',
        corporateTrusteeName: '',
        corporateTrusteeAbnAcn: '',
    });

    const [showTrusteeFields, setShowTrusteeFields] = useState(false);

    const validateABNACN = (value: string) => /^[0-9]{9,11}$/.test(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (value: string) => {
        let shouldDisplayTrusteeFields = value == LegalEntityType.Trust || value == LegalEntityType.SMSF;
        setShowTrusteeFields(shouldDisplayTrusteeFields);
        setFormData({...formData, type: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.type) {
            alert('Type is required');
            return;
        }
        if (!validateABNACN(formData.abnAcn)) {
            alert('ABN/ACN must be a 9 to 11 digit number');
            return;
        }
        if (showTrusteeFields) {
            if (formData.corporateTrusteeName || formData.corporateTrusteeAbnAcn) {
                if (!formData.corporateTrusteeName || !formData.corporateTrusteeAbnAcn) {
                    alert('Both Corporate Trustee Name and ABN/ACN must be filled if one is provided');
                    return;
                }
                if (!validateABNACN(formData.corporateTrusteeAbnAcn)) {
                    alert('Corporate Trustee ABN/ACN must be a 9 to 11 digit number');
                    return;
                }
            }
        }
        console.log(formData);
    };

    useEffect(() => {
        if (!showTrusteeFields) {
            setFormData({
                ...formData,
                corporateTrusteeName: '',
                corporateTrusteeAbnAcn: '',
            });
        }
    }, [showTrusteeFields]);

    return (
        <EntityForm>
            <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
                <CardHeader><CardTitle>Legal Entity</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <LabelAndInput label={'Name'} name={'name'} onChange={handleChange} value={formData.name}/>
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor="type">Type</Label>
                            <Select onValueChange={handleSelectChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Object.values(LegalEntityType).map((type, index) => (
                                            <SelectItem key={index} value={type}>{type}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <LabelAndInput label={'Legal Name'} name={'legalName'} onChange={handleChange} value={formData.legalName}/>
                        <LabelAndInput label={'ABN ACN'} name={'abnAcn'} onChange={handleChange} value={formData.abnAcn}/>
                        {showTrusteeFields && (
                            <>
                                <LabelAndInput label={'Corporate Trustee Name'} name={'corporateTrusteeName'} onChange={handleChange}
                                               value={formData.corporateTrusteeName}/>
                                <LabelAndInput label={'Corporate Trustee abnAcn'} name={'corporateTrusteeAbnAcn'} onChange={handleChange}
                                               value={formData.corporateTrusteeAbnAcn}/>
                            </>
                        )}

                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </EntityForm>
    );
}
