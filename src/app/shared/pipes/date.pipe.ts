import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DatePipe implements PipeTransform {

  transform(value: any, moveIn: string, moveOut: string){
        
    // To handle date
    if(!value) return [];

    if(moveIn === '' && moveOut === '') return value;

    return value.filter((obj : any) => {
      return obj.available[0].from == moveIn || obj.available[0].to == moveOut;
    })
  }
}