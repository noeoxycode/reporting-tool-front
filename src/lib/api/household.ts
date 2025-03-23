import {Household, HouseholdCreateInput, HouseholdUpdateInput} from "@/lib/types/household";

export async function getHouseholds(): Promise<Household[]> {
    const res = await fetch('http://127.0.0.1:3000/households');
    if (!res.ok) {
        throw new Error('Error while getting households');
    }
    return res.json();
}

export async function getHousehold(id: string): Promise<Household> {
    const res = await fetch(`http://127.0.0.1:3000/household/${id}`);
    if (!res.ok) {
        throw new Error(`Error while getting household ${id}`);
    }
    return res.json();
}

export async function createHousehold(data: HouseholdCreateInput): Promise<Household> {
    const res = await fetch('http://127.0.0.1:3000/household', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('Error while creating household');
    }
    return res.json();
}

export async function updateHousehold(id: string, data: HouseholdUpdateInput): Promise<void> {
    const res = await fetch(`http://127.0.0.1:3000/household/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Error while updating household ${id}`);
    }
}

export async function deleteHousehold(id: string): Promise<void> {
    const res = await fetch(`http://127.0.0.1:3000/household/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Error while deleting household ${id}`);
    }
}
