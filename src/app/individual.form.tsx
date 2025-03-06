'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Individual {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
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
    dob: '',
    gender: '',
    address: '',
    email: '',
    phone: '',
    activeStatus: '',
    adviceStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Card className="max-w-md mx-auto p-6 mt-6 shadow-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="activeStatus">Active Status</Label>
            <Input id="activeStatus" name="activeStatus" value={formData.activeStatus} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="adviceStatus">Advice Status</Label>
            <Input id="adviceStatus" name="adviceStatus" value={formData.adviceStatus} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
