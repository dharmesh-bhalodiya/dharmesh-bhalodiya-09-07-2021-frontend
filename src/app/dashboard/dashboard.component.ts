import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComposeModalComponent } from '../modal/compose-modal/compose-modal.component';
import { User } from '../shared/_models/user';
import { AccountService } from '../shared/services/account.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AccountService]

})
export class DashboardComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountService,

  ) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // this.loadAllUsers();

  }
  // loadAllUsers() {
  //   this.accountService.getAll().subscribe(users => { this.users = users; });
  // }

  openDialog() {
    this.dialog.open(ComposeModalComponent);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}


