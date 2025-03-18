import { COLORS } from "@/app/theme";
import CreateGoalForm from "@/components/goal/create-goal-form";

export default function NewGoalPage() {
  return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className={`text-2xl font-semibold mb-6 ${COLORS.text}`}>Add a new goal</h1>
          <CreateGoalForm />
        </div>
      </div>
  );
}
