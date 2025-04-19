export type Todo = {
    id: number;
    text: string;
    isCompleted: boolean;
    timestamp: number;
}

export type FilterType = 'all' | 'active' | 'completed';