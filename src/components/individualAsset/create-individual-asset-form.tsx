'use client';

import { useRouter } from 'next/navigation';
import { IndividualAssetCreateInput } from "@/lib/types/individualAsset";
import { createIndividualAsset } from "@/lib/api/individualAsset";
import IndividualAssetForm from "@/components/individualAsset/individual-asset-form";

export default function CreateIndividualAssetForm() {
    const router = useRouter();

    const handleSubmit = async (data: IndividualAssetCreateInput) => {
        await createIndividualAsset(data);
        router.push('/individual-assets');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Add a New Individual Asset</h2>
            <IndividualAssetForm onSubmit={handleSubmit} buttonText="Create" />
        </div>
    );
}
