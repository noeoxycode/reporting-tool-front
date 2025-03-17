import {Adviser, AdviserCreateInput, AdviserUpdateInput} from "@/lib/types/adviser";

export async function getAdvisers(): Promise<Adviser[]> {
    const res = await fetch('https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/advisers');

    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des advisers');
    }

    return res.json();
}

export async function getAdviser(id: string): Promise<Adviser> {
    const res = await fetch(`https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/adviser/${id}`);

    if (!res.ok) {
        throw new Error(`Erreur lors de la récupération de l'adviser ${id}`);
    }

    return res.json();
}

export async function createAdviser(data: AdviserCreateInput): Promise<Adviser> {
    const res = await fetch('https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/adviser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Erreur lors de la création de l\'adviser');
    }

    return res.json();
}

export async function updateAdviser(id: string, data: AdviserUpdateInput): Promise<void> {
    const res = await fetch(`https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/adviser/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la mise à jour de l'adviser ${id}`);
    }
}

export async function deleteAdviser(id: string): Promise<void> {
    const res = await fetch(`https://3zrs0rymo5.execute-api.eu-west-3.amazonaws.com/Prod/adviser/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la suppression de l'adviser ${id}`);
    }
}
