import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryApplication'
})
export class CountryApplicationPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.studentNationality?.toLocaleLowerCase().includes(args));
    })

  }
}