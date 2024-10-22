import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-api-key': 'ZdjsjtHbJh8QNnrKK2Uei2Xa7w0hMaIE9z62n5UR',
    })
};

@Injectable()
export class HousingService{
    
    constructor(private httpClient: HttpClient){}

    // housing anywhere
    getHousingAnywhereData(){
        return this.httpClient.post(environment.APIURL + `housinganywhere`, httpOptions);
    }

    // uniPlaces
    // getUniPlacesData(){
    //     return this.httpClient.get(environment.uniPlaces + `v1/cities`, httpOptions);
    // }
}