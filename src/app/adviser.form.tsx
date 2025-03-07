'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LabelAndInput } from '@/components/ui/label-and-input';
import EntityForm from '@/components/ui/entity-form';

interface Adviser {
    first_name: string;
    last_name: string;
    representative_number: string;
    image: File | null;
    address: string;
    email: string;
    mobile: string;
}

export default function AdviserForm() {
    const [formData, setFormData] = useState<Adviser>({
        first_name: '',
        last_name: '',
        representative_number: '',
        image: null,
        address: '',
        email: '',
        mobile: '',
    });

    const validateEmail = (email: string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^\+?[0-9]{7,15}$/.test(phone);
    };

    const validateRepresentativeNumber = (number: string) => {
        return /^[0-9]+$/.test(number);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            alert('Invalid email format');
            return;
        }
        if (!validatePhone(formData.mobile)) {
            alert('Invalid phone number format');
            return;
        }
        if (!validateRepresentativeNumber(formData.representative_number)) {
            alert('Representative number should contain only numbers');
            return;
        }
        console.log(formData);
    };

    return (
        <EntityForm>
            <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
                <CardHeader><CardTitle>Adviser</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <LabelAndInput label={'First Name'} onChange={handleChange} value={formData.first_name}/>
                            <LabelAndInput label={'Last Name'} onChange={handleChange} value={formData.last_name}/>
                        </div>
                        <LabelAndInput label={'Representative Number'} onChange={handleChange}
                                       value={formData.representative_number}/>
                        <div className="flex flex-col">
                            <label htmlFor="image" className="text-sm font-medium">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-2 border rounded-lg p-2"
                            />
                        </div>
                        <LabelAndInput label={'Address'} onChange={handleChange} value={formData.address}/>
                        <LabelAndInput type="email" label={'Email'} onChange={handleChange} value={formData.email}/>
                        <LabelAndInput type="tel" label={'Mobile'} onChange={handleChange} value={formData.mobile}/>
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </EntityForm>
    );
}