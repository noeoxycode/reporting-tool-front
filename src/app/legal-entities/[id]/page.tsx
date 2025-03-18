import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLegalEntityById } from '@/lib/api/legal-entity';
import DeleteButton from "@/components/legal-entity/legal-entity-delete-button";
import {COLORS} from "@/app/theme";

interface LegalEntityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function LegalEntityDetailPage(props: LegalEntityDetailPageProps) {
  const params = await props.params;
  const { id } = params;

  try {
    const legalEntity = await getLegalEntityById(id);

    return (
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mt-6">
          <Link href="/legal-entities" className="hover:underline">
            &larr; Back to Legal Entities
          </Link>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{legalEntity.name}</h1>
          <div className="flex space-x-2">
            <Link
              href={`/legal-entities/${id}/edit`}
              className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white ${COLORS.button} border border-transparent rounded-md hover:${COLORS.buttonHover}`}
            >
              Edit
            </Link>
            <DeleteButton id={id} name={legalEntity.name} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
              <dl className="grid grid-cols-1 gap-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Legal Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{legalEntity.legalName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Entity Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{legalEntity.type.toString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">ABN/ACN</dt>
                  <dd className="mt-1 text-sm text-gray-900">{legalEntity.abnAcn}</dd>
                </div>
              </dl>
            </div>

            {(legalEntity.type === 'Trust' || legalEntity.type === 'SMSF') && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Trustee Information</h2>
                <dl className="grid grid-cols-1 gap-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Corporate Trustee</dt>
                    <dd className="mt-1 text-sm text-gray-900">{legalEntity.corporateTrusteeName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Trustee ABN/ACN</dt>
                    <dd className="mt-1 text-sm text-gray-900">{legalEntity.corporateTrusteeAbnAcn}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-2">Status</h2>
              <dl className="grid grid-cols-1 gap-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Activity Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">{legalEntity.activeStatus}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Advice Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">{legalEntity.adviceStatus}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
