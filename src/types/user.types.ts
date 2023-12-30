export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

export interface ILoginInput {
    username: string;
    password: string;
}
