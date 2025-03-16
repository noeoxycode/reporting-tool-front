// app/legal-entity/[id]/edit/page.tsx
import Link from 'next/link';
import UpdateLegalEntityForm from "@/components/legal-entity/legal-entity-update-form";

interface EditLegalEntityPageProps {
  params: {
    id: string;
  };
}

export default function EditLegalEntityPage({ params }: EditLegalEntityPageProps) {
  const { id } = params;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mt-6">
            <Link href={`/legal-entities/${id}`} className="hover:underline">
                &larr; Back to Legal Entity Details
            </Link>
        </div>
      <UpdateLegalEntityForm id={id} />
    </div>
  );
}
