import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'shorten',
})
export class Shorten implements PipeTransform {
  transform(value: any, length: number) {
    if (value.length > length) {
      return value.substr(0, length) + ' ...';
    }

    return value;
  }
}
