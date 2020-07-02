import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showTextArea'
})
export class ShowTextAreaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
