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
  firstName: string;
  lastName: string;
  dob: Date | null;
  gender: string;
  address: string;
  email: string;
  phone: string;
  activeStatus: string;
  adviceStatus: string;
}

export default function IndividualForm() {
  const [formData, setFormData] = useState<Individual>({
    id: crypto.randomUUID(),
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    address: '',
    email: '',
    phone: '',
    activeStatus: '',
    adviceStatus: '',
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
              <LabelAndInput<Individual> label={'First Name'} name={'firstName'} onChange={handleChange} value={formData.firstName}></LabelAndInput>
              <LabelAndInput<Individual> label={'Last Name'} name={'lastName'} onChange={handleChange} value={formData.lastName}></LabelAndInput>
            </div>
            <LabelAndInput<Individual> type='date' label={'Date of Birth'} name={'dob'} onChange={handleChangeDate} value={formData.dob?.toISOString().substring(0,10) || ''}></LabelAndInput>
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
            <LabelAndInput<Individual> label={'Address'} name={'address'} onChange={handleChange} value={formData.address}></LabelAndInput>
            <LabelAndInput<Individual> type="email" label={'Email'} name={'email'} onChange={handleChange} value={formData.email}></LabelAndInput>
            <LabelAndInput<Individual> type="tel" label={'Phone'} name={'phone'} onChange={handleChange} value={formData.phone}></LabelAndInput>
            <div className="grid grid-cols-2 gap-4">
              <LabelAndInput<Individual> label={'Active Status'} name={'activeStatus'} onChange={handleChange} value={formData.activeStatus}></LabelAndInput>
              <LabelAndInput<Individual> label={'Advice Status'} name={'adviceStatus'} onChange={handleChange} value={formData.adviceStatus}></LabelAndInput>
            </div>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </EntityForm>
  );
}
