'use client';

import { useRouter } from 'next/navigation';
import {HouseholdCreateInput} from "@/lib/types/household";
import {createHousehold} from "@/lib/api/household";
import HouseholdForm from "@/components/household/household-form";

export default function CreateHouseholdForm() {
    const router = useRouter();

    const handleSubmit = async (data: HouseholdCreateInput) => {
        console.log(data);
        await createHousehold(data);
        router.push('/household');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Add a New household</h2>
            <HouseholdForm onSubmit={handleSubmit} buttonText="Create" />
        </div>
    );
}
