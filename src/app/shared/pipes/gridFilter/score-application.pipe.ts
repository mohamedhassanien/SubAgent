import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreApplication'
})
export class ScoreApplicationPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.studentScore?.toString().toLocaleLowerCase().includes(args));
    })

  }
}