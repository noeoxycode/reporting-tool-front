'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntityForm from "@/components/ui/entity-form";
import { LabelAndInput } from "@/components/ui/label-and-input";
import { useState } from "react";


interface Car {
    id: string; // UUID sous forme de string
    name: string;
    legalName: string;
    abn: string;
    representativeNumber: number;
    address: string;
    // TODO: responsibleUser[] (Définir le type de responsibleUser)
}




export default function CarForm() {
    const [formData, setFormData] = useState<Car>({
        id: crypto.randomUUID(),
        name: "",
        legalName: "",
        abn: "",
        representativeNumber: 0,
        address: "",
        // responsibleUsers: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            alert(errors)
        }
        console.log(formData);
    };


    function validate() {
        let newErrors: { [key in keyof Car]?: string } = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.legalName) newErrors.legalName = "Legal Name is required";
        if (!formData.abn) newErrors.abn = "ABN is required";

        return newErrors;
    }

    return (
        <EntityForm>
            <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
                <CardHeader>
                    <CardTitle>Car</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <LabelAndInput<Car> label="Name" name="name" onChange={handleChange} value={formData.name} />
                        <LabelAndInput<Car> label="Legal Name" name="legalName" onChange={handleChange} value={formData.legalName} />
                        <LabelAndInput<Car> label="ABN" name="abn" onChange={handleChange} value={formData.abn} />
                        <LabelAndInput<Car> type="number" label="Representative Number" name="representativeNumber" onChange={handleChange} value={formData.representativeNumber.toString()} />
                        <LabelAndInput<Car> label="Address" name="address" onChange={handleChange} value={formData.address} />
                        {/* TODO: Ajouter un champ pour responsibleUsers[] (ex: multiselect, checkboxes) */}
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </EntityForm>
    );
}
