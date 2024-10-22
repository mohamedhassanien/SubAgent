import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreProspect'
})
export class ScoreProspectPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.studentSeriousnessScore?.toString().toLocaleLowerCase().includes(args));
    })

  }
}