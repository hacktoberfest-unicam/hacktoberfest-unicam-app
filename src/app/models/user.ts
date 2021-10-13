export interface User extends UserDTO{
    // Github username
    closedPRs?: number[];
}

export interface UserDTO {
    nickname: string;
    name: string;
    surname: string;
}