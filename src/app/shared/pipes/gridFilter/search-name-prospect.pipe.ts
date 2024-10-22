import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNameProspect'
})
export class SearchNameProspectPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.studentName?.toLocaleLowerCase().includes(args));
    })


  }
}