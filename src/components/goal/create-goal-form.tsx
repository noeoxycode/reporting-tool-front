'use client';

import { useRouter } from 'next/navigation';
import {createGoal} from "@/lib/api/goal";
import {GoalCreateInput} from "@/lib/types/goal";
import GoalForm from "@/components/goal/goal-form";

export default function CreateGoalForm() {
    const router = useRouter();

    const handleSubmit = async (data: GoalCreateInput) => {
        console.log(data);
        await createGoal(data);
        router.push('/goals');
        router.refresh();
    };

    return (
        <div className="bg-white p-6">
            <h2 className="text-xl font-semibold mb-6">Add a New Goal</h2>
            <GoalForm onSubmit={handleSubmit} buttonText="Create" />
        </div>
    );
}
