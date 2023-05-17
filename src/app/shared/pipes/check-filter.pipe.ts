import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkFilter',
})
export class CheckFilterPipe implements PipeTransform {
  transform(value: any, house?: any, building?: any, apartment?: any) {
    // to handle types
    if (house === false && building === false && apartment === false)
      return value;

    if (house == true) house = 'house';
    if (building == true) building = 'building';
    if (apartment == true) apartment = 'apartment';

    return value.filter((obj: any) => {
      return (
        obj.typeLabel == house ||
        obj.typeLabel == building ||
        obj.typeLabel == apartment
      );
    });
  }
}
