import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reg'
})
export class RegPipe implements PipeTransform {

  transform(value: any, reg?: any){
    // to handle types
    if(reg === false) return value;

    if(reg == true)reg = 'yes';

    return value.filter((obj: any) => {
      return obj.facilities.registrationPossible.value == reg;
    })
  }

}
