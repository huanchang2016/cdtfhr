import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {

  step: 0 | 1 | 2 | 3 = 0;

  constructor() { }

  companyRegisterOption:any = {};
}
