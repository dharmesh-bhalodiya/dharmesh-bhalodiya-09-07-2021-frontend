import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string) {
        // return this.http.post<any>(`/users/authenticate`, { username: username })
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //         }
        //         return user;
        //     }));
        localStorage.setItem('currentUser', username);
        this.router.navigateByUrl('/dashboard');
        return;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}