import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ComposeModalComponent } from '../modal/compose-modal/compose-modal.component';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {

  id: string;
  message: any;
  currentYear: number;
  currentUser: string;
  public tabClicked = 'receive';


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route : ActivatedRoute,
    public toastr: ToastrManager,
    private accountService: AccountService

  ) { 
    this.currentUser = localStorage.getItem('currentUser');
    this.tabClicked = localStorage.getItem('tabClicked');

  }

  ngOnInit() {
    const date = new Date();
    this.currentYear = date.getFullYear();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMessage();

  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  openDialog() {
    this.dialog.open(ComposeModalComponent);
  }


  getMessage(){
    this.accountService.getMessageDetailById(this.id).subscribe(res=>{
      if(res.status == 200){
        this.message = res.body;
      } else {
        this.toastr.errorToastr('Error while geting data.', 'Error', {animate: 'slideFromRight'});
      }
    },err=>{
      this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
    })
  }

}
