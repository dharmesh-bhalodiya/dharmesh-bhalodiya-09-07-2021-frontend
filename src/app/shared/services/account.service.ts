import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

//   getDuration(data){
//     return this.httpClient.get(`${environment.API_URL}/duration`, {observe: 'response' , params : { type : data}});
//   }

// getSentMail(params){    
//     return this.httpClient.get(`${environment.API_URL}/dharmesh/sent`,  {observe: 'response' , params});
//   }

getAll() {
  return this.http.get<User[]>('${environment.API_URL}/dharmesh/sent');
}

 


}
