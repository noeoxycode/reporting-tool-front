import {Goal, GoalCreateInput, GoalUpdateInput} from "@/lib/types/goal";

const API_BASE_URL = "http://127.0.0.1:3000";

export async function getGoals(): Promise<Goal[]> {
    const res = await fetch(`${API_BASE_URL}/goals`);

    if (!res.ok) {
        throw new Error("Erreur lors de la récupération des goals");
    }

    return res.json();
}

export async function getGoal(id: string): Promise<Goal> {
    const res = await fetch(`${API_BASE_URL}/goal/${id}`);

    if (!res.ok) {
        throw new Error(`Erreur lors de la récupération du goal ${id}`);
    }

    return res.json();
}

export async function createGoal(data: GoalCreateInput): Promise<Goal> {
    const res = await fetch(`${API_BASE_URL}/goal`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Erreur lors de la création du goals");
    }

    return res.json();
}

export async function updateGoal(id: string, data: GoalUpdateInput): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/goal/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la mise à jour du goal ${id}`);
    }
}

export async function deleteGoal(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/goal/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Erreur lors de la suppression du goal ${id}`);
    }
}
