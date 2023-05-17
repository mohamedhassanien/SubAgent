import player from 'lottie-web';
import { PricePipe } from './pipes/price.pipe';
import { FurnPipe } from './pipes/furn.pipe';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { FacilitiesPipe } from './pipes/facilities.pipe';
import { DatePipe } from './pipes/date.pipe';
import { CheckFilterPipe } from './pipes/check-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';

import { SpinnerComponent } from './spinner/spinner.component';
import { FilterWithIndexPipe } from './pipes/filter-with-index.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { FilterOnePipe } from './pipes/filter-one.pipe';
import { LoadingComponent } from './loading/loading.component';
import { filterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { RegPipe } from './pipes/reg.pipe';
import { SuitablePipe } from './pipes/suitable.pipe';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    FilterOnePipe,
    SafePipe,
    ShortenPipe,
    SpinnerComponent,
    FilterWithIndexPipe,
    LoadingComponent,
    filterPipe,
    SortPipe,
    CheckFilterPipe,
    DatePipe,
    FacilitiesPipe,
    FirstLetterPipe,
    FurnPipe,
    PricePipe,
    RegPipe,
    SuitablePipe,
  ],
  imports: [CommonModule, LottieModule],
  exports: [
    LoadingComponent,
    SortPipe,
    SafePipe,
    FilterOnePipe,
    ShortenPipe,
    SpinnerComponent,
    FilterWithIndexPipe,
    CheckFilterPipe,
    DatePipe,
    FacilitiesPipe,
    FirstLetterPipe,
    FurnPipe,
    PricePipe,
    RegPipe,
    SuitablePipe,
    filterPipe,
    [LottieModule.forRoot({ player: playerFactory })],
  ],
})
export class SharedModule {}
