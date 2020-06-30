export class User {
    id: number;
    name: string;
    username: string;
    avatar: string;
    token: string;
}


export class ApiData {
    code: number;
    data: any;
    // tslint:disable-next-line: variable-name
    status_code: string;
    error?: string;
}

export class List {
    id: number;
    name: string;
}
