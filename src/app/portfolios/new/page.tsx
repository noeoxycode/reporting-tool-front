import { COLORS } from "@/app/theme";
import CreateForm from "@/components/portfolio/create-portfolio-form";

export default function NewPortfolioPage() {
  return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className={`text-2xl font-semibold mb-6 ${COLORS.text}`}>Add a new portfolio</h1>
          <CreateForm />
        </div>
      </div>
  );
}
