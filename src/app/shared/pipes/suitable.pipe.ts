import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suitable'
})
export class SuitablePipe implements PipeTransform {
  transform(value: any, dishWasher?: any, washingMachine?: any, dryer?: any, airConditioning?: any, heating?: any){
    // to handle types
    if(dishWasher === false && washingMachine === false && dryer === false && airConditioning === false && heating === false ) return value;

    if(dishWasher == true)dishWasher = 'yes';
    if(washingMachine == true)washingMachine = 'yes';
    if(dryer == true)dryer = 'yes';
    if(airConditioning == true)airConditioning = 'yes';
    if(heating == true)heating != 'unkown';
    
    if(dishWasher == false)dishWasher = 'no' || 'yes' || 'unknown';
    if(washingMachine == false)washingMachine = 'no' || 'yes' || 'unknown';
    if(dryer == false)dryer = 'no' || 'yes' || 'unknown';
    if(airConditioning == false)airConditioning = 'no' || 'yes' || 'unknown';
    if(heating == false)heating = 'unkown';
    

    return value.filter((obj: any) => {
      return obj.facilities.dishwasher.value == dishWasher || obj.facilities.washingMachine.value == washingMachine || obj.facilities.dryer.value == dryer || obj.facilities.airConditioning.value == airConditioning || obj.facilities.heating.value == heating;
    })
  }
}
