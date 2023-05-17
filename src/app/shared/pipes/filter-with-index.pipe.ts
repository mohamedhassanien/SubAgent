import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWithIndex',
})
export class FilterWithIndexPipe implements PipeTransform {
  transform(arr: any[], searchText: string, index: number): any[] {
    if (searchText == '' || searchText == null || searchText == undefined)
      return arr;
    if (!arr) return [];

    searchText = searchText.toLocaleUpperCase();
    return arr.filter((array) => {
      if (array[index].toLocaleUpperCase().includes(searchText)) return array;
    });
  }
}
