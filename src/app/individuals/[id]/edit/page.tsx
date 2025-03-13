// app/individuals/[id]/edit/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import UpdateForm from "@/components/individual/UpdateForm";
import {getIndividual} from "@/lib/api/individual";

interface EditPageProps {
    params: {
        id: string;
    };
}

export default async function EditIndividualPage({ params }: EditPageProps) {
    try {
        const individual = await getIndividual(params.id);

        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="mb-6">
                        <Link
                            href={`/individuals/${params.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            &larr; Retour aux détails
                        </Link>
                        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                            Modifier {individual.firstName} {individual.lastName}
                        </h1>
                    </div>

                    <UpdateForm individual={individual} />
                </div>
            </div>
        );
    } catch (error) {
        return notFound();
    }
}
