'use client';

import { useRouter } from 'next/navigation';
import IndividualAssetForm from "@/components/individualAsset/individual-asset-form";
import {IndividualAsset, IndividualAssetCreateInput} from "@/lib/types/individualAsset";
import {updateIndividualAsset} from "@/lib/api/individualAsset";

interface UpdateFormProps {
    individualAsset: IndividualAsset;
}

export default function UpdateIndividualAssetForm({ individualAsset }: UpdateFormProps) {
    const router = useRouter();

    const handleSubmit = async (data: IndividualAssetCreateInput) => {
        await updateIndividualAsset(individualAsset.id, data);
        router.push('/individual-assets');
        router.refresh();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Modify individual asset</h2>
            <IndividualAssetForm
                initialData={individualAsset}
                onSubmit={handleSubmit}
                buttonText="Modify"
            />
        </div>
    );
}
