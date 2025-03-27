import { COLORS } from "@/app/theme";
import CreateGoalForm from "@/components/goal/create-goal-form";
import CreateIndividualAssetForm from "@/components/individualAsset/create-individual-asset-form";

export default function NewIndividualAssetPage() {
  return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className={`text-2xl font-semibold mb-6 ${COLORS.text}`}>Add a new individual asset</h1>
          <CreateIndividualAssetForm />
        </div>
      </div>
  );
}
