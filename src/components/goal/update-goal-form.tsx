'use client';

import { useRouter } from 'next/navigation';
import {Goal, GoalCreateInput} from "@/lib/types/goal";
import GoalForm from "@/components/goal/goal-form";
import {updateGoal} from "@/lib/api/goal";

interface UpdateFormProps {
    goal: Goal;
}


export default function UpdateGoalForm({ goal }: UpdateFormProps) {
    const router = useRouter();

    const handleSubmit = async (data: GoalCreateInput) => {
        await updateGoal(goal.id, data);
        router.refresh();
    };

    return (
        <div className="bg-white  p-6">
            <h2 className="text-xl font-semibold mb-6">Modify goal</h2>
            <GoalForm
                initialData={goal}
                onSubmit={handleSubmit}
                buttonText="Modify"
            />
        </div>
    );
}
