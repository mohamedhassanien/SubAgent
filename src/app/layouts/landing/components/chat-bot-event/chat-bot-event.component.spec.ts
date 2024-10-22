import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotEventComponent } from './chat-bot-event.component';

describe('ChatBotEventComponent', () => {
  let component: ChatBotEventComponent;
  let fixture: ComponentFixture<ChatBotEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBotEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
