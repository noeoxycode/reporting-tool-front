import Link from 'next/link';
import { getGoals } from "@/lib/api/goal";
import { COLORS } from "@/app/theme";
import GoalCard from "@/components/goal/goal-card";

export const dynamic = 'force-dynamic';

export default async function GoalsPage() {
    const goals = await getGoals();

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-2xl font-semibold ${COLORS.text}`}>All goals</h1>
                    <Link
                        href="/goals/new"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                    >
                        Add goal
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {goals.length === 0 ? (
                        <div className={`bg-white shadow rounded-lg p-6 text-center ${COLORS.border}` }>
                            <p className={COLORS.text}>No goal found</p>
                            <Link
                                href="/goals/new"
                                className={`inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
                            >
                                Add your first goal
                            </Link>
                        </div>
                    ) : (
                        goals.map((goal) => (
                            <GoalCard key={goal.id} goal={goal} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
