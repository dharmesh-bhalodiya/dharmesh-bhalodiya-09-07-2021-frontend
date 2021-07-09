import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComposeModalComponent } from '../modal/compose-modal/compose-modal.component';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  openDialog() {
    this.dialog.open(ComposeModalComponent);
  }

}
