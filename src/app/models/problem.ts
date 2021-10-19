export interface Problem {
    id: string;
    name: string;
    levelName: string;
    basePoints: number;
    multiplier: number;
    description?: string;
}

export interface ProblemDTO {
    id: string;
    name: string;
    level_name: string;
    base_points: number;
    multiplier: number;
    description?: string;
}