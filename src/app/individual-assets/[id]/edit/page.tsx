import { COLORS } from "@/app/theme";
import { notFound } from "next/navigation";
import UpdateIndividualAssetForm from "@/components/individualAsset/update-individual-asset-form";
import {getIndividualAsset} from "@/lib/api/individualAsset";

export const dynamic = 'force-dynamic';


export default async function EditIndividualAssetPage({ params }: { params: Promise<{ id: string }> }) {
    try {
        const paramsAwaited = await params;
        const individualAsset = await getIndividualAsset(paramsAwaited.id);

        return (
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h1 className={`text-2xl font-semibold mb-6 ${COLORS.text}`}>Edit individual asset</h1>
                    <UpdateIndividualAssetForm individualAsset={individualAsset} />
                </div>
            </div>
        );
    } catch {
        return notFound();
    }
}
