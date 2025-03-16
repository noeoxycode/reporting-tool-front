// 'use client';
//
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { LabelAndInput } from '@/components/ui/label-and-input';
// import EntityForm from '@/components/ui/entity-form';
// import { LabelAndImageInput } from '@/components/ui/label-and-image-input';
//
// interface Adviser {
//     firstName: string;
//     lastName: string;
//     representativeNumber: string;
//     image: File | null;
//     address: string;
//     email: string;
//     mobile: string;
// }
//
// export default function AdviserForm() {
//     const [formData, setFormData] = useState<Adviser>({
//         firstName: '',
//         lastName: '',
//         representativeNumber: '',
//         image: null,
//         address: '',
//         email: '',
//         mobile: '',
//     });
//
//     const validateEmail = (email: string) => {
//         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
//     };
//
//     const validatePhone = (phone: string) => {
//         return /^\+?[0-9]{7,15}$/.test(phone);
//     };
//
//     const validateRepresentativeNumber = (number: string) => {
//         return /^[0-9]+$/.test(number);
//     };
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!validateEmail(formData.email)) {
//             alert('Invalid email format');
//             return;
//         }
//         if (!validatePhone(formData.mobile)) {
//             alert('Invalid phone number format');
//             return;
//         }
//         if (!validateRepresentativeNumber(formData.representativeNumber)) {
//             alert('Representative number should contain only numbers');
//             return;
//         }
//     };
//
//     return (
//         <EntityForm>
//             <Card className="max-w-lg mx-auto p-6 mt-6 shadow-lg rounded-lg border">
//                 <CardHeader><CardTitle>Adviser</CardTitle></CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <LabelAndInput label={'First Name'} name='firstName' onChange={handleChange} value={formData.firstName}/>
//                             <LabelAndInput label={'Last Name'} name='lastName' onChange={handleChange} value={formData.lastName}/>
//                         </div>
//                         <LabelAndInput label={'Representative Number'} name='representativeNumber' onChange={handleChange}
//                                        value={formData.representativeNumber}/>
//                         <LabelAndImageInput/>
//                         <LabelAndInput label={'Address'} name='address' onChange={handleChange} value={formData.address}/>
//                         <LabelAndInput type="email" label={'Email'} name='email' onChange={handleChange} value={formData.email}/>
//                         <LabelAndInput type="tel" label={'Mobile'} name='mobile' onChange={handleChange} value={formData.mobile}/>
//                         <Button type="submit" className="w-full">Submit</Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </EntityForm>
//     );
// }
