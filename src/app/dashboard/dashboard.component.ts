import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComposeModalComponent } from '../modal/compose-modal/compose-modal.component';
import { User } from '../shared/_models/user';
import { AccountService } from '../shared/services/account.service'
import { ToastrManager } from 'ng6-toastr-notifications';
import { DeleteComponent } from '../modal/delete/delete.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AccountService]

})
export class DashboardComponent implements OnInit {

  sentMessageListing = [{ sender: '', receiver: '', subject: '', message: '', id: '', created: '' }];
  receiveMessageListing = [{ sender: '', receiver: '', subject: '', message: '', id: '', created: '' }];

  currentUser: string;
  users: User[] = [];
  currentYear: number;
  message: any;
  noData: boolean;
  selectedTab: number;
  tabClicked: string;

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;



  constructor(
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountService,
    public toastr: ToastrManager,
    private ngxLoader: NgxUiLoaderService,

  ) {
    this.currentUser = localStorage.getItem('currentUser');
  }

  ngOnInit() {
    this.tabClicked = localStorage.getItem('tabClicked') ? localStorage.getItem('tabClicked') : 'receive';
    const date = new Date();
    this.currentYear = date.getFullYear();
    if(this.tabClicked == "receive") {
      this.getReceiveMessageListing();
    }
    else {
      this.getSentMessageListing();
    }
  }

  getReceiveMessageListing() {
    this.selectedTab = 0;
    this.ngxLoader.start();
    localStorage.setItem('tabClicked', 'receive');
    this.accountService.getReceiveMessageList().subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200) {
        if (res.body.length > 0) {
          this.receiveMessageListing = res.body;
          this.noData = false;
        }
        else {
          this.noData = true;
        }
      }
      else {
        this.toastr.errorToastr(res.message);
        this.noData = true;
      }
    },
      err => {
        this.toastr.errorToastr(err.error.error, 'Error');
        this.noData = true;
        this.ngxLoader.stop();
      });
  }
  
  getSentMessageListing() {
    this.selectedTab = 1;
    this.ngxLoader.start();
    localStorage.setItem('tabClicked', 'sent');
    this.accountService.getSentMessageList().subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200) {
        if (res.body.length > 0) {
          this.sentMessageListing = res.body;
          this.noData = false;
        }
        else {
          this.noData = true;
        }
      }
      else {
        this.toastr.errorToastr(res.message);
        this.noData = true;
      }
    },
      err => {
        this.toastr.errorToastr(err.error.error, 'Error');
        this.noData = true;
        this.ngxLoader.stop();

      });
  }

  openDialog() {
    const modelRef = this.dialog.open(ComposeModalComponent);
    modelRef.afterClosed().subscribe(result => {
      if (result) {
        if(this.selectedTab == 1) {
          this.getSentMessageListing();
        }
      }
  });
  }

  deleteDialog(id) {
    const modelRef = this.dialog.open(DeleteComponent);
    modelRef.componentInstance.id = id;
    modelRef.afterClosed().subscribe(result => {
      if (result) {
        if(this.selectedTab == 0) {
          this.getReceiveMessageListing();
        }
        else {
          this.getSentMessageListing();
        }
      }
  });
  }
  

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  tabClick(tab) {
    if(tab.index == 0) {
      this.getReceiveMessageListing();
    }
    else {
      this.getSentMessageListing();
    }
  }
}

function params(params: any) {
  throw new Error('Function not implemented.');
}

