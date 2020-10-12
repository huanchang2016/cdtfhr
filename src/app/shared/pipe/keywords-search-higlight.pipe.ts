import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'keywordsHiglight'
})
export class KeywordsSearchHiglightPipe implements PipeTransform {
  keywords: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params && params.keywords) {
        this.keywords = JSON.parse(params.keywords);
      }
    });
  }

  transform(value: string): any {
    let str:any = '';
    if(this.keywords.length != 0) {
      for (let i = 0; i < this.keywords.length; i++) {
        const element = this.keywords[i];
        if(value.includes(element)) {
          const reg = eval('/' + element + '/g');
          value = value.replace(reg, `<span class="text-white bg-green">${element}</span>`);
        }
      }
      str = value;
    }else {
      str = value;
    }
    return str;
  }

}
