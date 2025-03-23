import { getHousehold } from "@/lib/api/household";
import { COLORS } from "@/app/theme";
import { notFound } from "next/navigation";
import UpdateHouseholdForm from "@/components/household/update-household-form";

export const dynamic = 'force-dynamic';


export default async function EditHouseholdPage({ params }: { params: Promise<{ id: string }> }) {
    try {
        const paramsAwaited = await params;
        const household = await getHousehold(paramsAwaited.id);

        return (
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h1 className={`text-2xl font-semibold mb-6 ${COLORS.text}`}>Edit Household</h1>
                    <UpdateHouseholdForm household={household} />
                </div>
            </div>
        );
    } catch {
        return notFound();
    }
}
