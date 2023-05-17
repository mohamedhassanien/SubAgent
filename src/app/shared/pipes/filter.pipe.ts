import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class filterPipe implements PipeTransform {
  transform(value: any, searchText: string) {
    // To handle search
    if (!value) return [];

    if (!searchText || searchText === '') return value;

    searchText = searchText.toLocaleUpperCase();

    return value.filter((obj: any) => {
      return obj.location.city
        .toString()
        .toLocaleUpperCase()
        .includes(searchText);
    });
  }
}
