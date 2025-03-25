'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { IndividualCreateInput, Individual } from "@/lib/types/individual";
import { COLORS } from "@/app/theme";
import { IndividualAdviserRelation } from "@/lib/types/relations/individual-adviser-relation";
import {getAdvisers} from "@/lib/api/adviser";
import {Adviser} from "@/lib/types/adviser";

interface IndividualFormProps {
    initialData?: Individual;
    onSubmit: (data: IndividualCreateInput) => Promise<void>;
    buttonText: string;
}

export default function IndividualForm({ initialData, onSubmit, buttonText }: IndividualFormProps) {
    const [formData, setFormData] = useState<IndividualCreateInput>({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        dob: initialData?.dob || '',
        gender: initialData?.gender || '',
        address: initialData?.address || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        activeStatus: initialData?.activeStatus || 'Active',
        adviceStatus: initialData?.adviceStatus || 'Pending',
        individualAdviserRelation: initialData?.individualAdviserRelation || { adviserId: '', individualId: '', adviser: null, individual: null } as IndividualAdviserRelation
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [advisers, setAdvisers] = useState<Adviser[]>([]);

    useEffect(() => {
        const fetchAdvisers = async () => {
            try {
                const data = await getAdvisers();
                setAdvisers(data);
            } catch (err) {
                console.error("Error fetching advisers:", err);
            }
        };
        fetchAdvisers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name === 'adviserId') {
                return {
                    ...prev,
                    individualAdviserRelation: {
                        ...prev.individualAdviserRelation,
                        adviserId: value || '',
                        individualId: prev.individualAdviserRelation?.individualId || '',
                        adviser: prev.individualAdviserRelation?.adviser || null,
                        individual: prev.individualAdviserRelation?.individual || null,
                    }
                };
            }
            return { ...prev, [name]: value };
        });
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

                <div>
                    <label htmlFor="dob" className={labelClass}>
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="gender" className={labelClass}>
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="address" className={labelClass}>
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
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
                    <label htmlFor="phone" className={labelClass}>
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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

                <div>
                    <label htmlFor="adviserId" className={labelClass}>Select Adviser</label>
                    <select
                        id="adviserId"
                        name="adviserId"
                        value={formData.individualAdviserRelation?.adviserId}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    >
                        <option value="">Choose an adviser</option>
                        {advisers.map((adviser) => (
                            <option key={adviser.id} value={adviser.id}>{adviser.firstName} {adviser.lastName}</option>
                        ))}
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
