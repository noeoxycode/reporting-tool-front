'use client';

import { useRouter } from 'next/navigation';
import { AdviserCreateInput } from "@/lib/types/adviser";
import { createAdviser } from "@/lib/api/adviser";
import AdviserForm from "@/components/adviser/adviser-form";

export default function CreateForm() {
    const router = useRouter();

    const handleSubmit = async (data: AdviserCreateInput) => {
        console.log(data);
        await createAdviser(data);
        router.push('/advisers');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Add a New Adviser</h2>
            <AdviserForm onSubmit={handleSubmit} buttonText="Create" />
        </div>
    );
}
