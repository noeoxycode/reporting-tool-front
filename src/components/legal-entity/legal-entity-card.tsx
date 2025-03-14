// app/components/legal-entity/LegalEntityCard.tsx
import Link from 'next/link';
import { LegalEntity } from '@/lib/types/legal-entity';
import { COLORS } from '@/app/theme';
import DeleteButton from "@/components/legal-entity/legal-entity-delete-button";

interface LegalEntityCardProps {
  legalEntity: LegalEntity;
}

export default function LegalEntityCard({ legalEntity }: LegalEntityCardProps) {
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Determine advice status color
  const getAdviceStatusColor = (status: string) => {
    switch (status) {
      case 'Advised':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Not Required':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{legalEntity.name}</h3>
          <p className="text-sm text-gray-600">{legalEntity.type.toString()}</p>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(legalEntity.activeStatus)}`}>
            {legalEntity.activeStatus}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${getAdviceStatusColor(legalEntity.adviceStatus)}`}>
            {legalEntity.adviceStatus}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p><span className="font-medium">Legal Name:</span> {legalEntity.legalName}</p>
        <p><span className="font-medium">ABN/ACN:</span> {legalEntity.abnAcn}</p>
        
        {(legalEntity.type === 'Trust' || legalEntity.type === 'SMSF') && (
          <>
            <p><span className="font-medium">Corporate Trustee:</span> {legalEntity.corporateTrusteeName}</p>
            <p><span className="font-medium">Trustee ABN/ACN:</span> {legalEntity.corporateTrusteeAbnAcn}</p>
          </>
        )}
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Link 
          href={`/legal-entities/${legalEntity.id}`}
          className={`px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200`}
        >
          View Details
        </Link>
        <Link 
          href={`/legal-entities/${legalEntity.id}/edit`}
          className={`px-3 py-1 text-sm rounded-md ${COLORS.button} text-white`}
        >
          Edit
        </Link>
        <DeleteButton id={legalEntity.id} name={legalEntity.name} />

      </div>
    </div>
  );
}
