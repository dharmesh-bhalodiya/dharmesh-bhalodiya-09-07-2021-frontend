import { Injectable } from '@angular/core';


@Injectable()
export class CommonHelper {

  private static isExpired = '';

  checkIfIsLoggedIn() {
    if (localStorage) {
      return (localStorage.getItem('currentUser.token'));
    }
    alert('Local Storage is not supported.');
    return false;
  }

}
