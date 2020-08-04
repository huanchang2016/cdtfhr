
export class AccountInfo {
    name: string;
    phone: string;
    type: 'user' | 'company';
}


export class userProfile {
    name: string;
    phone: string;
    id_card: string;
    complete: number;
    status: 0 | 1 | 2;
}
export class ApiData {
    code: number;
    data: any;
    // tslint:disable-next-line: variable-name
    status_code: string;
    // error?: string;
    message?: string;
}

export class List {
    id: number;
    name: string;
}

