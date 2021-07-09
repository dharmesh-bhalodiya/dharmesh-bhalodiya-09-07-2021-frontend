import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-modal',
  templateUrl: './compose-modal.component.html',
  styleUrls: ['./compose-modal.component.css']
})
export class ComposeModalComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,

  ) { }

  ngOnInit() {
  }
  sendMessage() {
    this.router.navigateByUrl('/dashboard');
  }

}
