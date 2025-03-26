'use client';

import React, { useState, FormEvent } from 'react';
import { COLORS } from "@/app/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Portfolio, PortfolioCreateInput} from "@/lib/types/portfolio";

interface PortfolioFormProps {
    initialData?: Portfolio;
    onSubmit: (data: PortfolioCreateInput) => Promise<void>;
    buttonText: string;
}

export default function PortfolioForm({ initialData, onSubmit, buttonText }: PortfolioFormProps) {
    const [formData, setFormData] = useState<PortfolioCreateInput>({
        name: initialData?.name || '',
        activeStatus: initialData?.activeStatus || 'Active',
        adviceStatus: initialData?.adviceStatus || 'Pending',
        image: initialData?.image || null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleActiveStatusChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            activeStatus: value
        }));
    };

    const handleAdviceStatusChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            adviceStatus: value
        }));
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="name" className={labelClass}>
                        Portfolio Name
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

                <div>
                    <label htmlFor="activeStatus" className={labelClass}>
                        Active Status
                    </label>
                    <Select
                        value={formData.activeStatus}
                        onValueChange={handleActiveStatusChange}
                    >
                        <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select active status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label htmlFor="adviceStatus" className={labelClass}>
                        Advice Status
                    </label>
                    <Select
                        value={formData.adviceStatus}
                        onValueChange={handleAdviceStatusChange}
                    >
                        <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select advice status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
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
