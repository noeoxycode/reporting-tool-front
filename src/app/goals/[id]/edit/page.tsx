import { COLORS } from "@/app/theme";
import { notFound } from "next/navigation";
import {getGoal} from "@/lib/api/goal";
import UpdateGoalForm from "@/components/goal/update-goal-form";

export const dynamic = 'force-dynamic';


export default async function EditGoalPage({ params }: { params: Promise<{ id: string }> }) {
    try {
        const paramsAwaited = await params;
        const goal = await getGoal(paramsAwaited.id);

        return (
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h1 className={`text-2xl font-semibold mb-6 ${COLORS.text}`}>Edit Goal</h1>
                    <UpdateGoalForm goal={goal} />
                </div>
            </div>
        );
    } catch (error) {
        return notFound();
    }
}
