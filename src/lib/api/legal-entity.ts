import { LegalEntity, LegalEntityCreateInput } from '@/lib/types/legal-entity';

const BASE_URL = 'http://127.0.0.1:3000';

export async function createLegalEntity(data: LegalEntityCreateInput): Promise<LegalEntity> {
  const response = await fetch(BASE_URL + "/legal-entity", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create legal entity');
  }

  return response.json();
}

export async function getAllLegalEntities(): Promise<LegalEntity[]> {
  const response = await fetch(BASE_URL + "/legal-entities");

  if (!response.ok) {
    throw new Error('Failed to fetch legal entities');
  }

  return response.json();
}

export async function getLegalEntityById(id: string): Promise<LegalEntity> {
  const response = await fetch(`${BASE_URL}/legal-entity/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch legal entity');
  }

  return response.json();
}

export async function updateLegalEntity(id: string, data: LegalEntityCreateInput): Promise<void> {
  const response = await fetch(`${BASE_URL}/legal-entity/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update legal entity');
  }
}

export async function deleteLegalEntity(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/legal-entity/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete legal entity');
  }
}
