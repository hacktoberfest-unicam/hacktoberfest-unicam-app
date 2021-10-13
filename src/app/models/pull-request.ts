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