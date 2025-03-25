import {Individual, IndividualCreateInput, IndividualUpdateInput} from "@/lib/types/individual";

export async function getIndividuals(): Promise<Individual[]> {
    const res = await fetch('http://127.0.0.1:3000/individuals');

    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des individuals');
    }

    return res.json();
}

export async function getIndividual(id: string): Promise<Individual> {
    const res = await fetch(`http://127.0.0.1:3000/individual/${id}`);

    if (!res.ok) {
        throw new Error(`Erreur lors de la récupération de l'individual ${id}`);
    }
    return res.json();
}

export async function createIndividual(data: IndividualCreateInput): Promise<Individual> {
    const res = await fetch('http://127.0.0.1:3000/individual', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Erreur lors de la création de l\'individual');
    }
    const result = await res.json();
    if (data.individualAdviserRelation?.adviserId) {
        await linkIndividualAdviser(result.id, data.individualAdviserRelation?.adviserId);
    }
    return result;
}

export async function updateIndividual(id: string, data: IndividualUpdateInput): Promise<void> {
    const res = await fetch(`http://127.0.0.1:3000/individual/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la mise à jour de l'individual ${id}`);
    }
    if (data.individualAdviserRelation?.adviserId) {
        await linkIndividualAdviser(id, data.individualAdviserRelation?.adviserId);
    }
}

export async function deleteIndividual(id: string): Promise<void> {
    const res = await fetch(`http://127.0.0.1:3000/individual/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la suppression de l'individual ${id}`);
    }
}

export async function linkIndividualAdviser(individualId: string, adviserId: string): Promise<void> {
    const res = await fetch(`http:///127.0.0.1:3000/adviser/link/individual/${individualId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adviserId })
        }
    );
    if (!res.ok) {
        throw new Error(`Error while linkin individual ${individualId} to adviser ${adviserId}`);
    }
}
