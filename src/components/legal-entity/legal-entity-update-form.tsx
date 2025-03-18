'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LegalEntity, LegalEntityCreateInput } from '@/lib/types/legal-entity';
import { getLegalEntityById, updateLegalEntity } from '@/lib/api/legal-entity';
import LegalEntityForm from "@/components/legal-entity/legal-entity-form";

interface UpdateLegalEntityFormProps {
  id: string;
}

export default function UpdateLegalEntityForm({ id }: UpdateLegalEntityFormProps) {
  const router = useRouter();
  const [legalEntity, setLegalEntity] = useState<LegalEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLegalEntity = async () => {
      try {
        const data = await getLegalEntityById(id);
        setLegalEntity(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch legal entity');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLegalEntity();
  }, [id]);

  const handleSubmit = async (data: LegalEntityCreateInput) => {
    await updateLegalEntity(id, data);
    router.push(`/legal-entities/${id}`);
    router.refresh();
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!legalEntity) return <div className="text-red-500">Legal entity not found</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Legal Entity</h2>
      <LegalEntityForm
        initialData={legalEntity}
        onSubmit={handleSubmit}
        buttonText="Update Legal Entity"
      />
    </div>
  );
}
