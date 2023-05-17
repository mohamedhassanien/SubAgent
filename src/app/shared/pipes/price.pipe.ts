import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: any, minPrice: any, maxPrice: any) {
    
    // To handle price
    if(!value) return [];

    if(minPrice === 0 && maxPrice === 2500) return value;

    return value.filter((obj : any) => obj.costsFormatted.price <= maxPrice && obj.costsFormatted.price > minPrice);
  }

}
