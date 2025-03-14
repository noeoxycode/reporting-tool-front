import Link from 'next/link';
import { getAllLegalEntities } from '@/lib/api/legal-entity';
import LegalEntityCard from "@/components/legal-entity/legal-entity-card";
import {COLORS} from "@/app/theme";

export const dynamic = 'force-dynamic';

export default async function LegalEntitiesPage() {
  const legalEntities = await getAllLegalEntities();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Legal Entities</h1>
        <Link
          href="/legal-entities/new"
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${COLORS.button} hover:${COLORS.buttonHover}`}
        >
          Add New Legal Entity
        </Link>
      </div>

      {legalEntities.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No legal entities found.</p>
          <p className="mt-2">
            <Link href="/legal-entities/new" className="text-blue-600 hover:underline">
              Create your first legal entity
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalEntities.map((legalEntity) => (
            <LegalEntityCard key={legalEntity.id} legalEntity={legalEntity} />
          ))}
        </div>
      )}
    </div>
  );
}
