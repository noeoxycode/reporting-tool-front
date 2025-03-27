'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Household, HouseholdCreateInput } from "@/lib/types/household";
import { Individual } from "@/lib/types/individual";
import { COLORS } from "@/app/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrashIcon, PlusIcon } from "lucide-react";
import { getIndividuals } from "@/lib/api/individual";
import {HouseholdIndividualRelation} from "@/lib/types/relations/household-individual-relation";

interface HouseholdFormProps {
    initialData?: Household;
    onSubmit: (data: HouseholdCreateInput) => Promise<void>;
    buttonText: string;
}

export default function HouseholdForm({ initialData, onSubmit, buttonText }: HouseholdFormProps) {
    const [formData, setFormData] = useState<HouseholdCreateInput>({
        name: initialData?.name || '',
        image: initialData?.image || null,
        address: initialData?.address || '',
        activeStatus: initialData?.activeStatus || 'active',
        adviceStatus: initialData?.adviceStatus || 'pending',
        anniversary: initialData?.anniversary || '',
        relations: initialData?.relations || []
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [individuals, setIndividuals] = useState<Individual[]>([]);
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [percentageError, setPercentageError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIndividuals = async () => {
            try {
                const data = await getIndividuals();
                setIndividuals(data);
            } catch (err) {
                setError('Erreur lors de la récupération des individuals');
            }
        };

        fetchIndividuals();
    }, []);

    useEffect(() => {
        const total = formData.relations.reduce((sum, relation) => sum + (relation.ownershipPercentage || 0), 0);
        setTotalPercentage(total);

        if (formData.relations.length > 0 && total !== 100) {
            setPercentageError(`Le pourcentage total doit être de 100% (actuellement: ${total}%)`);
        } else {
            setPercentageError(null);
        }
    }, [formData.relations]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = (field: 'activeStatus' | 'adviceStatus', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addRelation = () => {
        setFormData(prev => ({
            ...prev,
            relations: [
                ...prev.relations,
                {
                    id: '',
                    householdId: initialData?.id || '',
                    individualId: '',
                    ownershipPercentage: 0
                } as HouseholdIndividualRelation
            ]
        }));
    };

    const removeRelation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            relations: prev.relations.filter((_, i) => i !== index)
        }));
    };

    const updateRelation = (index: number, field: keyof HouseholdIndividualRelation, value: any) => {
        setFormData(prev => {
            const newRelations = [...prev.relations];
            newRelations[index] = {
                ...newRelations[index],
                [field]: field === 'ownershipPercentage' ? Number(value) : value
            };
            return {
                ...prev,
                relations: newRelations
            };
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.relations.length === 0) {
            setError('Au moins un individual doit être ajouté');
            return;
        }

        if (totalPercentage !== 100) {
            setError('Le pourcentage total doit être exactement de 100%');
            return;
        }

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
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className={errorClass}>
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="name" className={labelClass}>
                        Nom du Household
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

                <div className="md:col-span-2">
                    <label htmlFor="address" className={labelClass}>
                        Adresse
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
                    <label htmlFor="anniversary" className={labelClass}>
                        Date d'anniversaire
                    </label>
                    <input
                        type="date"
                        id="anniversary"
                        name="anniversary"
                        value={formData.anniversary}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="activeStatus" className={labelClass}>
                        Statut
                    </label>
                    <Select
                        value={formData.activeStatus}
                        onValueChange={(value) => handleStatusChange('activeStatus', value)}
                    >
                        <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="on_hold">On Hold</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label htmlFor="adviceStatus" className={labelClass}>
                        Statut de conseil
                    </label>
                    <Select
                        value={formData.adviceStatus}
                        onValueChange={(value) => handleStatusChange('adviceStatus', value)}
                    >
                        <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Sélectionner un statut de conseil" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Relations avec les Individuals</h3>
                    <button
                        type="button"
                        onClick={addRelation}
                        className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.button}`}
                    >
                        <PlusIcon className="h-4 w-4 mr-2" /> Ajouter
                    </button>
                </div>

                {percentageError && (
                    <div className={`${errorClass} my-3`}>
                        {percentageError}
                    </div>
                )}

                <div className="mb-3">
                    <div className="flex justify-end items-center">
                        <span className={`${labelClass} mr-2`}>Total: {totalPercentage}%</span>
                        <div className={`w-40 h-2 rounded-full bg-gray-200 mr-10`}>
                            <div
                                className={`h-2 rounded-full ${totalPercentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {formData.relations.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-md border">
                        <p className="text-gray-500">Aucune relation ajoutée. Cliquez sur "Ajouter" pour commencer.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {formData.relations.map((relation, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-end border p-3 rounded">
                                <div className="col-span-6">
                                    <label className={`${labelClass} mb-1`}>
                                        Individual
                                    </label>
                                    <Select
                                        value={relation.individualId}
                                        onValueChange={(value) => updateRelation(index, 'individualId', value)}
                                    >
                                        <SelectTrigger className={inputClass}>
                                            <SelectValue placeholder="Sélectionner un individual" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {individuals.map((individual) => (
                                                <SelectItem
                                                    key={individual.id}
                                                    value={individual.id}
                                                    disabled={formData.relations.some(
                                                        (r, i) => i !== index && r.individualId === individual.id
                                                    )}
                                                >
                                                    {individual.firstName} {individual.lastName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-5">
                                    <label className={`${labelClass} mb-1`}>
                                        Pourcentage (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={relation.ownershipPercentage}
                                        onChange={(e) => updateRelation(index, 'ownershipPercentage', e.target.value)}
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => removeRelation(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting || formData.relations.length === 0 || totalPercentage !== 100}
                    className={buttonClass}
                >
                    {isSubmitting ? 'Traitement en cours...' : buttonText}
                </button>
            </div>
        </form>
    );
}
