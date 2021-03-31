import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filter: string, property: string): any {
    if (value.length === 0 || filter.length === 0 ) {
      return value;
    }

    const filtered: any = [];
    for (const element of value) {
      if (element[property].toLowerCase().startsWith(filter.toLowerCase())) {
        filtered.push(element);
      }
    }

    return filtered;
  }

}
