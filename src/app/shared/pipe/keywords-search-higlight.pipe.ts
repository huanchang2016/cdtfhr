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
      if (params && params.keywords) {
        // this.keywords = JSON.parse(params.keywords);
        const isJson: boolean = this.isJSON(params.keywords);
        if (isJson) {
          this.keywords = JSON.parse(params.keywords);
        }
      }
    });
  }

  isJSON(str: any) { // 判断搜索条件是否为字符串
    if (typeof str == 'string') {
      try {
        const obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }

  transform(value: string): any {
    let str: any = '';
    if (this.keywords.length != 0) {
      for (let i = 0; i < this.keywords.length; i++) {
        const element = this.keywords[i];
        if (value.includes(element)) {
          const reg = eval('/' + element + '/g');
          value = value.replace(reg, `<span class="text-white bg-green">${element}</span>`);
        }
      }
      str = value;
    } else {
      str = value;
    }
    return str;
  }

}
