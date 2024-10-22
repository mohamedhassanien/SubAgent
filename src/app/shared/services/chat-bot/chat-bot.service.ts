import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

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

  updatePreference(
    educationStatus: string,
    educationLevel: string,
    frenchTestName: string,
    frenchTestScore: string,
    englishTestName: string,
    englishTestScore: string,
    interests: string,
    budget: string
  ) {
    return this._Http.post(
      environment.APIURL +
        `chat?username=${
          this.stuUserName
        }&current_status=${educationStatus}&highest_level=${educationLevel}&field_intereset=${interests}&language_study=${''}&eng_language_test=${''}&eng_test_name=${englishTestName}&eng_test_score=${englishTestScore}&fr_language_test=${''}&fr_test_name=${frenchTestName}&fr_test_score=${frenchTestScore}&budget=${budget}`,
      httpOptions
    );
  }

  sendData(chatData: {
    education_level : number,
    grade : number,
    fieldOfInterst : number[],
    language_preference : number,
    proficiency_english : number,
    english_test : number,
    eng_testScore : number,
    proficiency_french : number,
    french_test : number,
    fr_testScore : number,
    budget : number
  }, name: string) {
    // console.log(chatData[1]);
    // const interests = JSON.stringify(chatData[1]);
    // if (chatData.hasOwnProperty(5) == false) {
    //   chatData[5] = { answer: 'none', option: 'none', sc: 'none' };
    // }
    // if (chatData.hasOwnProperty(6) == false) {
    //   chatData[6] = { answer: 'none', option: 'none', sc: 'none' };
    // }

    // return this._Http.post(
    //   environment.APIURL +
    //     `chat?username=${name}&current_status=${
    //       chatData[0].eduLevel
    //     }&highest_level=${
    //       chatData[0].grade
    //     }&field_intereset=${interests}&language_study=${
    //       chatData[2].lang
    //     }&eng_language_test=${chatData[5].answer} &eng_test_name=${
    //       chatData[5].option ? chatData[5].option : 'none'
    //     }&eng_test_score=${
    //       chatData[5].sc ? chatData[5].sc : 'none'
    //     }&fr_language_test=${chatData[6].answer}&fr_test_name=${
    //       chatData[6].option ? chatData[6].option : 'none'
    //     }&fr_test_score=${chatData[6].sc ? chatData[6].sc : 'none'}&budget=${
    //       chatData[3].min
    //     }`,
    //   httpOptions
    // );

    return this._Http.post(
      environment.APIURL +
        `chat?username=${name}&current_status=${
          chatData.education_level
        }&highest_level=${
          chatData.grade
        }&field_intereset=${chatData.fieldOfInterst}&language_study=${
          chatData.language_preference
        }&eng_language_test=${chatData.proficiency_english} &eng_test_name=${
          chatData.proficiency_english == 1 ? chatData.english_test : 'none'
        }&eng_test_score=${
          chatData.proficiency_english == 1 ? chatData.eng_testScore : 'none'
        }&fr_language_test=${chatData.proficiency_french}&fr_test_name=${
          chatData.proficiency_french == 1 ? chatData.french_test : 'none'
        }&fr_test_score=${chatData.proficiency_french ? chatData.fr_testScore : 'none'}&budget=${
          chatData.budget
        }`,
      httpOptions
    );
    
  }
}
