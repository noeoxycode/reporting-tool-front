'use client';

import { useRouter } from 'next/navigation';
import IndividualForm from './individual-form';
import {Individual, IndividualCreateInput} from "@/lib/types/individual";
import {updateIndividual} from "@/lib/api/individual";

interface UpdateFormProps {
    individual: Individual;
}

export default function UpdateForm({ individual }: UpdateFormProps) {
    const router = useRouter();

    const handleSubmit = async (data: IndividualCreateInput) => {
        await updateIndividual(individual.id, data);
        router.push('/individuals');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Modify individual</h2>
            <IndividualForm
                initialData={individual}
                onSubmit={handleSubmit}
                buttonText="Modify"
            />
        </div>
    );
}
