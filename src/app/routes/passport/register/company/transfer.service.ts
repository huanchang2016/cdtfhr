import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {

  step: -1 | 0 | 1 | 2 | 3 = -1;

  constructor() { }

  companyRegisterOption: any = {};
}
