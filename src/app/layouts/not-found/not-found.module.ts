import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404Component } from './components/error404/error404.component';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: Error404Component,
  },
];

@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    [LottieModule.forRoot({ player: playerFactory })],
    RouterModule.forChild(routes),
  ],
})
export class NotFoundModule {}
