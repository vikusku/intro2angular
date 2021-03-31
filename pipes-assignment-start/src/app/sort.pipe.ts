import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {

  transform(value: any, propertyName: string): any {
    return value.sort((item1, item2) => {
      let item1Val = item1[propertyName].toUpperCase();
      let item2Val = item2[propertyName].toUpperCase();

      if (item1Val < item2Val) {
        return -1;
      }

      if (item1Val > item2Val) {
        return 1;
      }

      return 0;
     })
  }
}
