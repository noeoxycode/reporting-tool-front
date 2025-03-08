'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LabelAndInput } from '@/components/ui/label-and-input';
import EntityForm from '@/components/ui/entity-form';
import { LabelAndImageInput } from '@/components/ui/label-and-image-input';


interface Goal {
  id: string;
  name: string;
  type: string;
  startDate: Date | null;
  targetDate: Date | null;
  amount: number;
  priority: string;
  image: string;
  activeStatus: string;
  adviceStatus: string;
}

export default function GoalForm() {
  const [formData, setFormData] = useState<Goal>({
    id: crypto.randomUUID(),
    name: '',
    type: '',
    startDate: null,
    targetDate: null,
    amount: 0,
    priority: '',
    image: '',
    activeStatus: '',
    adviceStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleChangeDate = (name: keyof Goal, value: string) => {
    setFormData({ ...formData, [name]: value ? new Date(value) : null });
  };

  const handleSelectChange = (name: keyof Goal, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validate();
    console.log(formData);
  };

  function validate() {
    if (!formData.name) alert('Name is required');
    if (!formData.startDate) alert('Start Date is required');
    if (!formData.targetDate) alert('Target Date is required');
  }

  return (
    <EntityForm>
      <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
        <CardHeader><CardTitle>Goal</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <LabelAndInput<Goal> label={'Name'} name={'name'}  onChange={handleChange} value={formData.name}></LabelAndInput>
            <LabelAndInput<Goal> label={'Type'} name={'type'}  onChange={handleChange} value={formData.type}></LabelAndInput>
            <div className="grid grid-cols-2 gap-4">
              <LabelAndInput<Goal> type='date' label={'Start Date'} name={'targetDate'} onChange={(e) => handleChangeDate('startDate', e.target.value)} value={formData.startDate?.toISOString().substring(0,10) || ''}></LabelAndInput>
              <LabelAndInput<Goal> type='date' label={'Target Date'}  name={'targetDate'}  onChange={(e) => handleChangeDate('targetDate', e.target.value)} value={formData.targetDate?.toISOString().substring(0,10) || ''}></LabelAndInput>
            </div>
            <LabelAndInput<Goal> type='number' label={'Amount'} name={'amount'}  onChange={handleChangeNumber} value={formData.amount.toString()}></LabelAndInput>
            <LabelAndInput<Goal> label={'Priority'}  name={'priority'}  onChange={handleChange} value={formData.priority}></LabelAndInput>
            <LabelAndImageInput<Goal> name='image'/>
            <LabelAndInput<Goal> label={'Active Status'} name={'activeStatus'} onChange={handleChange} value={formData.activeStatus}></LabelAndInput>
            <LabelAndInput<Goal> label={'Advice Status'} name={'adviceStatus'} onChange={handleChange} value={formData.adviceStatus}></LabelAndInput>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </EntityForm>
  );
}
