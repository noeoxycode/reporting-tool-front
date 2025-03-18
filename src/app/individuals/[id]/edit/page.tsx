// app/individuals/[id]/edit/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import UpdateForm from "@/components/individual/update-form";
import {getIndividual} from "@/lib/api/individual";

interface EditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditIndividualPage(props: EditPageProps) {
    const params = await props.params;
    try {
        const individual = await getIndividual(params.id);

        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="mb-6">
                        <Link
                            href={`/individuals/${params.id}`}
                        >
                            &larr; Back to details
                        </Link>
                        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                            Modify {individual.firstName} {individual.lastName}
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
