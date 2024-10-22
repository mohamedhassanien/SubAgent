import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNameApplication'
})
export class SearchNameApplicationPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.studentFullName?.toLocaleLowerCase().includes(args));
    })


  }
}