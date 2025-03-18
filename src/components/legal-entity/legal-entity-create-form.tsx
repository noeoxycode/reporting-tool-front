// app/components/legal-entity/create-form.tsx
'use client';

import { useRouter } from 'next/navigation';
import { LegalEntityCreateInput } from '@/lib/types/legal-entity';
import { createLegalEntity } from '@/lib/api/legal-entity';
import LegalEntityForm from "@/components/legal-entity/legal-entity-form";

export default function CreateLegalEntityForm() {
  const router = useRouter();

  const handleSubmit = async (data: LegalEntityCreateInput) => {
    await createLegalEntity(data);
    router.push('/legal-entities');
    router.refresh();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Legal Entity</h2>
      <LegalEntityForm onSubmit={handleSubmit} buttonText="Create Legal Entity"
      />
    </div>
  );
}
