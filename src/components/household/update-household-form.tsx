'use client';

import { useRouter } from 'next/navigation';
import {Household, HouseholdUpdateInput} from "@/lib/types/household";
import HouseholdForm from "@/components/household/household-form";
import {updateHousehold} from "@/lib/api/household";

interface UpdateHouseholdFormProps {
    household: Household;
}

export default function UpdateHouseholdForm({ household }: UpdateHouseholdFormProps) {
    const router = useRouter();

    const handleSubmit = async (data: HouseholdUpdateInput) => {
        await updateHousehold(household.id, data);
        router.push('/households');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Modify household</h2>
            <HouseholdForm
                initialData={household}
                onSubmit={handleSubmit}
                buttonText="Modify"
            />
        </div>
    );
}
