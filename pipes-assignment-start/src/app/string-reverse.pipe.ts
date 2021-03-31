import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringReverse'
})
export class StringReversePipe implements PipeTransform {

  transform(value: any): any {
    const toArray = value.split('');
    const reversed = toArray.reverse();

    return reversed.join('');
  }

}
