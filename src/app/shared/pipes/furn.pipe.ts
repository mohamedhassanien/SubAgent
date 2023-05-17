import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'furn',
})
export class FurnPipe implements PipeTransform {
  transform(value: any, furn?: any, unFurn?: any) {
    // to handle types
    if (furn === false && unFurn === false) return value;

    if (furn == true) furn = 'yes';
    if (unFurn == true) unFurn = 'no';

    return value.filter((obj: any) => {
      return (
        obj.facilities.roomFurniture.value == furn ||
        obj.facilities.roomFurniture.value == unFurn
      );
    });
  }
}
