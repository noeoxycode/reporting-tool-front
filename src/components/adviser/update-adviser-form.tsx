'use client';

import { useRouter } from 'next/navigation';
import { Adviser, AdviserCreateInput } from "@/lib/types/adviser";
import { updateAdviser } from "@/lib/api/adviser";
import AdviserForm from "@/components/adviser/adviser-form";

interface UpdateFormProps {
    adviser: Adviser;
}

export default function UpdateForm({ adviser }: UpdateFormProps) {
    const router = useRouter();

    const handleSubmit = async (data: AdviserCreateInput) => {
        await updateAdviser(adviser.id, data);
        router.push('/advisers');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Modify adviser</h2>
            <AdviserForm
                initialData={adviser}
                onSubmit={handleSubmit}
                buttonText="Modify"
            />
        </div>
    );
}
