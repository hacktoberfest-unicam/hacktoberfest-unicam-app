export interface PullRequest {
    // PR number
    id: number;
    // Problem ID
    problemId: string;
    // Github username of the PR submitter
    nickname: string;
    mergeTime: Date;
    bonusPoints?: number;
    bonusComment?: string;
}

export interface PullRequestDTO {
    id: number,
    problem_id: string,
    nickname: string,
    merge_time: Date,
    bonus_points?: number,
    bonus_comment?: string,
}