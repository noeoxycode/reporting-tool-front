'use client';

import React, { useState, FormEvent } from 'react';
import { AdviserCreateInput, Adviser } from "@/lib/types/adviser";
import { COLORS } from "@/app/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdviserFormProps {
    initialData?: Adviser;
    onSubmit: (data: AdviserCreateInput) => Promise<void>;
    buttonText: string;
}

export default function AdviserForm({ initialData, onSubmit, buttonText }: AdviserFormProps) {
    const [formData, setFormData] = useState<AdviserCreateInput>({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        image: initialData?.image || null,
        address: initialData?.address || '',
        email: initialData?.email || '',
        mobile: initialData?.mobile || '',
        representativeNumber: initialData?.representativeNumber || '',
        activeStatus: initialData?.activeStatus || 'Active', // Added activeStatus with default value
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

    // Handle status change from Select component
    const handleStatusChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            activeStatus: value
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

    // Input field class with extracted color variables
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
                <div>
                    <label htmlFor="firstName" className={labelClass}>
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className={labelClass}>
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="address" className={labelClass}>
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="email" className={labelClass}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="mobile" className={labelClass}>
                        Mobile
                    </label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="representativeNumber" className={labelClass}>
                        Representative Number
                    </label>
                    <input
                        type="text"
                        id="representativeNumber"
                        name="representativeNumber"
                        value={formData.representativeNumber}
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
                        onValueChange={handleStatusChange}
                    >
                        <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
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
