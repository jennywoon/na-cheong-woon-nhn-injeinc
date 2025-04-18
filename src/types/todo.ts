export type Todo = {
    id: number;
    text: string;
    status: '' | 'checked' | 'completed';
    timestamp: number;
}