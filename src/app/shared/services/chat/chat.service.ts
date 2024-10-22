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
export class ChatService {
  constructor(private _Http: HttpClient) {}

  // Get questions
  getQusetions(chosenValue: string) {
    return this._Http.post(
      environment.APIURL + `GetQs?category=${chosenValue}`,
      httpOptions
    );
  }

  // chat answer
  getAnswer(qusValue: string) {
    return this._Http.get(
      environment.APIURL +
        `gpt?question=
    ${qusValue}`,
      httpOptions
    );
  }
}
