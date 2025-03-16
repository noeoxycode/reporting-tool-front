import {Individual, IndividualCreateInput, IndividualUpdateInput} from "@/lib/types/individual";

export async function getIndividuals(): Promise<Individual[]> {
    const res = await fetch('https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/individuals');

    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des individuals');
    }

    return res.json();
}

export async function getIndividual(id: string): Promise<Individual> {
    const res = await fetch(`https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/individual/${id}`);

    if (!res.ok) {
        throw new Error(`Erreur lors de la récupération de l'individual ${id}`);
    }

    return res.json();
}

export async function createIndividual(data: IndividualCreateInput): Promise<Individual> {
    const res = await fetch('https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/individual', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Erreur lors de la création de l\'individual');
    }

    return res.json();
}

export async function updateIndividual(id: string, data: IndividualUpdateInput): Promise<void> {
    const res = await fetch(`https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/individual/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la mise à jour de l'individual ${id}`);
    }
}

export async function deleteIndividual(id: string): Promise<void> {
    const res = await fetch(`https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/individual/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la suppression de l'individual ${id}`);
    }
}
