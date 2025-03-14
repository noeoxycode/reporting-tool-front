// app/legal-entity/all/page.tsx
import Link from 'next/link';
import { getAllLegalEntities } from '@/lib/api/legal-entity';
import DeleteButton from "@/components/legal-entity/legal-entity-delete-button";

export const dynamic = 'force-dynamic';

export default async function AllLegalEntitiesPage() {
  const legalEntities = await getAllLegalEntities();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Legal Entities</h1>
        <div className="flex space-x-2">
          <Link href="/legal-entities" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Card View
          </Link>
          <Link href="/legal-entities/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add New Legal Entity
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ABN/ACN
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Advice Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {legalEntities.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No legal entities found
                </td>
              </tr>
            ) : (
              legalEntities.map((entity) => (
                <tr key={entity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entity.name}</div>
                    <div className="text-sm text-gray-500">{entity.legalName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entity.type.toString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entity.abnAcn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      entity.activeStatus === 'Active' ? 'bg-green-100 text-green-800' :
                      entity.activeStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {entity.activeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      entity.adviceStatus === 'Advised' ? 'bg-blue-100 text-blue-800' :
                      entity.adviceStatus === 'Pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {entity.adviceStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link href={`/legal-entities/${entity.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </Link>
                    <Link href={`/legal-entities/${entity.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
