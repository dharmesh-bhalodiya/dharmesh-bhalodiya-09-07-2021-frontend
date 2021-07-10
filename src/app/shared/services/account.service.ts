import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getSentMessageList(): any {
     let username = localStorage.getItem("currentUser");
    return this.http.get(`${environment.API_URL}/${username}/sent`, { observe: 'response' });
  }

  getReceiveMessageList(): any {
    let username = localStorage.getItem("currentUser");
    return this.http.get(`${environment.API_URL}/${username}/receive`, { observe: 'response' });
  }

  getMessageDetailById(id: any) {
    return this.http.get(`${environment.API_URL}/${id}`, { observe: 'response' });
  }

  sendMessage(data): any {
    return this.http.post(`${environment.API_URL}`, data , { observe: 'response' });
  } 

  deleteMsg(id: any) {
    return this.http.delete(`${environment.API_URL}/${id}`, { observe: 'response' });
  }

}
