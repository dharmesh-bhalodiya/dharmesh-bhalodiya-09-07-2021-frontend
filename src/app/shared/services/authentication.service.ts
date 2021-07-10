import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string) {
        localStorage.setItem('currentUser', username);
        this.router.navigateByUrl('/dashboard');
        return;
    }
    logout() {
        localStorage.clear();
    }
}