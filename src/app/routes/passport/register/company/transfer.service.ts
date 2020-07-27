import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {

  step: 0 | 1 | 2 | 3 = 2;

  constructor() { }

  companyRegisterOption:any = {
    checkPassword: 'a123456789a'
  };
}
