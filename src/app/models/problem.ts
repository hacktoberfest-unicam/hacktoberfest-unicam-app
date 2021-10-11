export interface Problem {
    id: string;
    name: string;
    levelName: string;
    basePoints: number;
    multiplier: number;
    description?: string;
}