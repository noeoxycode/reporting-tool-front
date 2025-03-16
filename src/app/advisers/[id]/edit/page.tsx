import { getAdviser } from "@/lib/api/adviser";
import { COLORS } from "@/app/theme";
import { notFound } from "next/navigation";
import UpdateForm from "@/components/adviser/update-adviser-form";

export const dynamic = 'force-dynamic';

export default async function EditAdviserPage({ params }: { params: { id: string } }) {
    try {
        const adviser = await getAdviser(params.id);

        return (
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h1 className={`text-2xl font-semibold mb-6 ${COLORS.text}`}>Edit Adviser</h1>
                    <UpdateForm adviser={adviser} />
                </div>
            </div>
        );
    } catch (error) {
        return notFound();
    }
}
