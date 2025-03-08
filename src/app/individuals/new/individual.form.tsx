'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LabelAndInput } from '@/components/ui/label-and-input';
import EntityForm from '@/components/ui/entity-form';

interface Individual {
  id: string;
  first_name: string;
  last_name: string;
  dob: Date | null;
  gender: string;
  address: string;
  email: string;
  phone: string;
  active_status: string;
  advice_status: string;
}

export default function IndividualForm() {
  const [formData, setFormData] = useState<Individual>({
    id: crypto.randomUUID(),
    first_name: '',
    last_name: '',
    dob: null,
    gender: '',
    address: '',
    email: '',
    phone: '',
    active_status: '',
    advice_status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });    
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, ['dob']: new Date(e.target.value)});    
  };

  const handleSelectChange = (name: keyof Individual, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    validate()
    e.preventDefault();
    console.log(formData);
  };

  function validate() {
    if(formData.dob == null) alert('Date of Birth is required')
  }

  return (
    <EntityForm>
      <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
        <CardHeader><CardTitle>Individual</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <LabelAndInput label={'First Name'} onChange={handleChange} value={formData.first_name}></LabelAndInput>
              <LabelAndInput label={'Last Name'} onChange={handleChange} value={formData.last_name}></LabelAndInput>
            </div>
            <LabelAndInput type='date' label={'Date of Birth'} onChange={handleChangeDate} value={formData.dob?.toISOString().substring(0,10) || ''}></LabelAndInput>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <LabelAndInput label={'Address'} onChange={handleChange} value={formData.address}></LabelAndInput>
            <LabelAndInput type="email" label={'Email'} onChange={handleChange} value={formData.email}></LabelAndInput>
            <LabelAndInput type="tel" label={'Phone'} onChange={handleChange} value={formData.phone}></LabelAndInput>
            <div className="grid grid-cols-2 gap-4">
              <LabelAndInput label={'Active Status'} onChange={handleChange} value={formData.active_status}></LabelAndInput>
              <LabelAndInput label={'Advice Status'} onChange={handleChange} value={formData.advice_status}></LabelAndInput>
            </div>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </EntityForm>
  );
}
