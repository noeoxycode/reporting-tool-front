'use client';

import { useRouter } from 'next/navigation';
import IndividualForm from './individual-form';
import { IndividualCreateInput } from "@/lib/types/individual";
import { createIndividual } from "@/lib/api/individual";

export default function CreateIndividualForm() {
    const router = useRouter();

    const handleSubmit = async (data: IndividualCreateInput) => {
        console.log(data);
        await createIndividual(data);
        router.push('/individuals');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Add a New Individual</h2>
            <IndividualForm onSubmit={handleSubmit} buttonText="Create" />
        </div>
    );
}
