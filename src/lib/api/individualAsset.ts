import {IndividualAsset, IndividualAssetCreateInput, IndividualAssetUpdateInput} from "@/lib/types/individualAsset";

const API_BASE_URL = "http://127.0.0.1:3000";

export async function getIndividualAssets(): Promise<IndividualAsset[]> {
    const res = await fetch(`${API_BASE_URL}/individual-assets`);

    if (!res.ok) {
        throw new Error("Erreur lors de la récupération des individualAssets");
    }

    return res.json();
}

export async function getIndividualAsset(id: string): Promise<IndividualAsset> {
    const res = await fetch(`${API_BASE_URL}/individual-asset/${id}`);

    if (!res.ok) {
        throw new Error(`Erreur lors de la récupération du individualAsset ${id}`);
    }

    return res.json();
}

export async function createIndividualAsset(data: IndividualAssetCreateInput): Promise<IndividualAsset> {
    const res = await fetch(`${API_BASE_URL}/individual-asset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Erreur lors de la création du individualAssets");
    }

    return res.json();
}

export async function updateIndividualAsset(id: string, data: IndividualAssetUpdateInput): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/individual-asset/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la mise à jour du individualAsset ${id}`);
    }
}

export async function deleteIndividualAsset(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/individual-asset/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la suppression du individualAsset ${id}`);
    }
}
