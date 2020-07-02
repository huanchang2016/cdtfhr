import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showWeekends'
})
export class ShowWeekendsPipe implements PipeTransform {

  transform(value: string,): unknown {
    return null;
  }

}
