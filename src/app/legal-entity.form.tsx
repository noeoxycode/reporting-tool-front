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
    legal_name: string;
    abn_acn: string;
    corporate_trustee_name: string;
    corporate_trustee_abn_acn: string;
}

export default function LegalEntityForm() {
    const [formData, setFormData] = useState<LegalEntity>({
        name: '',
        type: '',
        legal_name: '',
        abn_acn: '',
        corporate_trustee_name: '',
        corporate_trustee_abn_acn: '',
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
        if (!validateABNACN(formData.abn_acn)) {
            alert('ABN/ACN must be a 9 to 11 digit number');
            return;
        }
        if (showTrusteeFields) {
            if (formData.corporate_trustee_name || formData.corporate_trustee_abn_acn) {
                if (!formData.corporate_trustee_name || !formData.corporate_trustee_abn_acn) {
                    alert('Both Corporate Trustee Name and ABN/ACN must be filled if one is provided');
                    return;
                }
                if (!validateABNACN(formData.corporate_trustee_abn_acn)) {
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
                corporate_trustee_name: '',
                corporate_trustee_abn_acn: '',
            });
        }
    }, [showTrusteeFields]);

    return (
        <EntityForm>
            <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
                <CardHeader><CardTitle>Legal Entity</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <LabelAndInput label={'Name'} onChange={handleChange} value={formData.name}/>
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
                        <LabelAndInput label={'Legal Name'} onChange={handleChange} value={formData.legal_name}/>
                        <LabelAndInput label={'ABN ACN'} onChange={handleChange} value={formData.abn_acn}/>
                        {showTrusteeFields && (
                            <>
                                <LabelAndInput label={'Corporate Trustee_Name'} onChange={handleChange}
                                               value={formData.corporate_trustee_name}/>
                                <LabelAndInput label={'Corporate Trustee_ABN_ACN'} onChange={handleChange}
                                               value={formData.corporate_trustee_abn_acn}/>
                            </>
                        )}

                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </EntityForm>
    );
}
