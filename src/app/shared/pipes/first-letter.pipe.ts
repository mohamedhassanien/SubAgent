import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: string) {
    let first = value.substring(0,1).toUpperCase();
    return first+value.substring(1);
  }

}
