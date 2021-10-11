export interface PullRequest {
    // PR number
    id: number;
    // Problem ID
    problemId: string;
    // Github username of the PR submitter
    nickname: string;
    bonusPoints?: number;
    bonusComment?: string;
}