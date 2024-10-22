import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { ChatBotComponent } from './chat-bot.component';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {MatStepperModule} from '@angular/material/stepper';


const routes: Routes = [
  {
    path: '',
    component: ChatBotComponent,
  },
];

@NgModule({
  declarations: [OverviewComponent, ChatComponent, ChatBotComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SelectButtonModule,
    NgxSliderModule,
    FormsModule,
    MatStepperModule,
    RouterModule.forChild(routes),
  ],
})
export class ChatBotModule {}
