import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facilities',
})
export class FacilitiesPipe implements PipeTransform {
  transform(
    value: any,
    bathroom?: any,
    balcony?: any,
    garden?: any,
    kitchen?: any,
    pets?: any,
    parking?: any,
    wheelchair?: any,
    basement?: any
  ) {
    // to handle types
    if (
      bathroom === false &&
      balcony === false &&
      garden === false &&
      kitchen === false &&
      pets === false &&
      parking === false &&
      wheelchair === false &&
      basement === false
    )
      return value;
    if (bathroom == true) bathroom = 'bathroom';
    if (balcony == true) balcony = 'balcony';
    if (garden == true) garden = 'garden';
    if (kitchen == true) kitchen = 'kitchen';
    if (pets == true) pets = 'pets';
    if (parking == true) parking = 'parking';
    if (wheelchair == true) wheelchair = 'wheelchair';
    if (basement == true) basement = 'basement';

    return value.filter((obj: any) => {
      return (
        obj.typeLabel == bathroom ||
        obj.typeLabel == balcony ||
        obj.typeLabel == garden ||
        obj.typeLabel == kitchen ||
        obj.typeLabel == pets ||
        obj.typeLabel == parking ||
        obj.typeLabel == wheelchair ||
        obj.typeLabel == basement
      );
    });
  }
}

// if(bathroom === false && balcony === false && garden === false && kitchen === false && pets === false && parking === false && wheelchair === false && basement === false) return array;
