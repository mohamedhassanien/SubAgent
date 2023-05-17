import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(arr: any[], sortText: Student, ...type: any) {
    console.log(sortText, type);
    if (!arr) return [];

    if (!type || type === 'reset') return arr;

    if (
      Object.entries(sortText).length == 0 ||
      sortText == null ||
      sortText == undefined
    )
      return arr;

    // for (const sorted of Object.values(sortText)) {
    //   console.log(sorted);
    // }

    // const filteredArray =
    //   type === 'ascending'
    //     ? arr.sort((a, b) => (a[sortText] > b[sortText] ? 1 : -1))
    //     : arr.sort((a, b) => (a[sortText] < b[sortText] ? 1 : -1));

    // for (const sortText of sortTexts) {
    //   console.log(sortText);
    // }

    return arr;
  }
}
