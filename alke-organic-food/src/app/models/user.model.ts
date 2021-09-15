
export class User {
    id: number;
    fullnames: string;
    username: string;
    email: string;
    password: string;
}




export class UserServerResponse {
    users: User[];
}