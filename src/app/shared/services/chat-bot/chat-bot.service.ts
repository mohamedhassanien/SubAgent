import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  stuUserName = localStorage.getItem('userName');

  constructor(private _Http: HttpClient) {}

  getInfo() {
    return this._Http.post(
      environment.APIURL +
        `student/getUserInfoForChatBot?userName=${this.stuUserName}`,
      httpOptions
    );
  }

  checkchatbot(stuUserName: string) {
    return this._Http.post(
      environment.APIURL + `checkchatbot?username=${stuUserName}`,
      httpOptions
    );
  }

  sendChatData(chatData: any) {
    return this._Http.post(
      environment.APIURL + `chat?arr=${chatData}&username=${this.stuUserName}`,
      httpOptions
    );
  }
}
