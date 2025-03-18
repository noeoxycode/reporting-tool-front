'use client';

import React, {useState, FormEvent, useEffect, useCallback} from 'react';
import { LegalEntityCreateInput, LegalEntity, LegalEntityType } from "@/lib/types/legal-entity";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LabelAndInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const LabelAndInput = ({ label, name, value, onChange, required = true }: LabelAndInputProps) => (
    <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={name}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

interface LegalEntityFormProps {
    initialData?: LegalEntity;
    onSubmit: (data: LegalEntityCreateInput) => Promise<void>;
    buttonText: string;
}

export default function LegalEntityForm({ initialData, onSubmit, buttonText }: LegalEntityFormProps) {
    const [formData, setFormData] = useState<LegalEntityCreateInput>({
        name: initialData?.name || '',
        type: initialData?.type || LegalEntityType.Company,
        legalName: initialData?.legalName || '',
        abnAcn: initialData?.abnAcn || '',
        corporateTrusteeName: initialData?.corporateTrusteeName || '',
        corporateTrusteeAbnAcn: initialData?.corporateTrusteeAbnAcn || '',
        activeStatus: initialData?.activeStatus || 'Active',
        adviceStatus: initialData?.adviceStatus || 'Pending'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showTrusteeFields, setShowTrusteeFields] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = useCallback(() => {
        const baseFieldsValid =
            formData.name.trim() !== '' &&
            formData.legalName.trim() !== '' &&
            formData.abnAcn.trim() !== '';

        const trusteeFieldsValid = !showTrusteeFields ||
            (formData.corporateTrusteeName?.trim() !== '' &&
                formData.corporateTrusteeAbnAcn?.trim() !== '');

        setIsFormValid(baseFieldsValid && trusteeFieldsValid);
    }, [formData, showTrusteeFields]);

    useEffect(() => {
        setShowTrusteeFields(
            formData.type === LegalEntityType.Trust ||
            formData.type === LegalEntityType.SMSF
        );
    }, [formData.type]);

    useEffect(() => {
        validateForm();
    }, [formData, showTrusteeFields, validateForm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            setError("Pleaqe fill all required fields");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-md">
            <CardHeader>
                <CardTitle>Legal Entity</CardTitle>
            </CardHeader>

            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelAndInput
                            label="Entity Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={true}
                        />

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="type">
                                Entity Type
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Select
                                value={formData.type.toString()}
                                onValueChange={(value) => handleSelectChange("type", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(LegalEntityType).map((type) => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <LabelAndInput
                            label="Legal Name"
                            name="legalName"
                            value={formData.legalName}
                            onChange={handleChange}
                            required={true}
                        />

                        <LabelAndInput
                            label="ABN/ACN"
                            name="abnAcn"
                            value={formData.abnAcn}
                            onChange={handleChange}
                            required={true}
                        />

                        {showTrusteeFields && (
                            <>
                                <LabelAndInput
                                    label="Corporate Trustee Name"
                                    name="corporateTrusteeName"
                                    value={formData.corporateTrusteeName || ''}
                                    onChange={handleChange}
                                    required={true}
                                />

                                <LabelAndInput
                                    label="Corporate Trustee ABN/ACN"
                                    name="corporateTrusteeAbnAcn"
                                    value={formData.corporateTrusteeAbnAcn || ''}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </>
                        )}

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="activeStatus">
                                Activity Status
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Select
                                value={formData.activeStatus}
                                onValueChange={(value) => handleSelectChange("activeStatus", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="adviceStatus">
                                Advice Status
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Select
                                value={formData.adviceStatus}
                                onValueChange={(value) => handleSelectChange("adviceStatus", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select advice status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Advised">Advised</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Not Required">Not Required</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>

            <CardFooter className="flex justify-end">
                <div className="flex flex-col items-end gap-2">
                    {!isFormValid && (
                        <p className="text-sm text-red-500">All required fields must be filled</p>
                    )}
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !isFormValid}
                    >
                        {isSubmitting ? 'Processing...' : buttonText}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
