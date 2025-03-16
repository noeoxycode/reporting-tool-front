'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntityForm from "@/components/ui/entity-form";
import { LabelAndImageInput } from "@/components/ui/label-and-image-input";
import { LabelAndInput } from "@/components/ui/label-and-input";
import { useState } from "react";

interface OtherUser {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  activeStatus: string;
}

export default function PersonForm() {
  const [formData, setFormData] = useState<OtherUser>({
    id: crypto.randomUUID(),
    firstName: '',
    lastName: '',
    image: '',
    email: '',
    activeStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validate();
    console.log(formData);
  };

  function validate() {
    if (!formData.firstName) alert('First Name is required');
    if (!formData.lastName) alert('Last Name is required');
    if (!formData.email) alert('Email is required');
  }

  return (
    <EntityForm>
      <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
        <CardHeader><CardTitle>Other User</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <LabelAndInput label={'First Name'} name={'firstName'} onChange={handleChange} value={formData.firstName}/>
            <LabelAndInput label={'Last Name'} name={'lastName'} onChange={handleChange} value={formData.lastName}/>
            <LabelAndImageInput/>
            <LabelAndInput type='email' name={'email'} label={'Email'} onChange={handleChange} value={formData.email}/>
            <LabelAndInput label={'Active Status'} name={'activeStatus'} onChange={handleChange} value={formData.activeStatus}/>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </EntityForm>
  );
}