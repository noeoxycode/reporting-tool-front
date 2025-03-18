export interface Goal {
    id: string;
    name: string;
    type: string;
    startDate: string;
    targetDate: string;
    amount: number;
    priority: string;
    image: string | null;
    activeStatus: string;
    adviceStatus: string;
}

export type GoalCreateInput = Omit<Goal, 'id'>;
export type GoalUpdateInput = Partial<Goal>;
