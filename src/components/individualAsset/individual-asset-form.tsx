'use client';

import React, { useState, FormEvent } from 'react';
import {IndividualAsset, IndividualAssetCreateInput} from "@/lib/types/individualAsset";
import { COLORS } from "@/app/theme";

interface IndividualAssetFormProps {
    initialData?: IndividualAsset;
    onSubmit: (data: IndividualAssetCreateInput) => Promise<void>;
    buttonText: string;
}

export default function IndividualAssetForm({ initialData, onSubmit, buttonText }: IndividualAssetFormProps) {
    const [formData, setFormData] = useState<IndividualAssetCreateInput>({
        name: initialData?.name || '',
        type: initialData?.type || '',
        activeStatus: initialData?.activeStatus || 'Active',
        adviceStatus: initialData?.adviceStatus || 'Pending',
        taxRate: initialData?.taxRate || 0
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'taxRate' ? Number(value) : value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = `mt-1 block w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`;
    const labelClass = `block text-sm font-medium ${COLORS.text}`;
    const errorClass = `${COLORS.error.bg} border ${COLORS.error.border} ${COLORS.error.text} px-4 py-3 rounded`;
    const buttonClass = `inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${COLORS.button} focus:outline-none focus:ring-2 focus:ring-offset-2 ${COLORS.buttonRing} disabled:opacity-50`;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className={errorClass}>
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="type" className={labelClass}>
                    Asset name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="type" className={labelClass}>
                        Asset Type
                    </label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="taxRate" className={labelClass}>
                        Tax Rate (%)
                    </label>
                    <input
                        type="number"
                        id="taxRate"
                        name="taxRate"
                        value={formData.taxRate}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.01"
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="activeStatus" className={labelClass}>
                        Activity Status
                    </label>
                    <select
                        id="activeStatus"
                        name="activeStatus"
                        value={formData.activeStatus}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="adviceStatus" className={labelClass}>
                        Advice Status
                    </label>
                    <select
                        id="adviceStatus"
                        name="adviceStatus"
                        value={formData.adviceStatus}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    >
                        <option value="Advised">Advised</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Required">Not Required</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonClass}
                >
                    {isSubmitting ? 'Processing...' : buttonText}
                </button>
            </div>
        </form>
    );
}
