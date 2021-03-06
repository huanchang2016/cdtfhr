
export class AccountInfo {
    name: string;
    company_name?:string;
    phone: string;
    type: 'user' | 'company';
}
export class userProfile {
    name: string;
    phone: string;
    id_card: string;
    complete: number;
    status: 0 | 1 | 2;
    deliver_sum: number;
    invite_sum: number;
    notice_sum: number;
    view: number;
    avatar?: string;
}
export class ApiData {
    code: number;
    data: any;
    // tslint:disable-next-line: variable-name
    status_code: string;
    // error?: string;
    message?: string;
    meta?:any;
}

export class List {
    id: number;
    name: string;
}


export class Config {
    id: number;
    key: string;
    value: string;
}
