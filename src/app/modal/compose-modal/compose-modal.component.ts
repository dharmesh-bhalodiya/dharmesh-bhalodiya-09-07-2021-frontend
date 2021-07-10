import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-compose-modal',
  templateUrl: './compose-modal.component.html',
  styleUrls: ['./compose-modal.component.css']
})
export class ComposeModalComponent implements OnInit {


  messageForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  currentUser: string;

  constructor(
    private dialogRef: MatDialogRef<ComposeModalComponent>,
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
  ) {
    this.currentUser = localStorage.getItem('currentUser');
  }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      sender: ['', Validators.required],
      receiver: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.messageForm.get('sender').setValue(this.currentUser)
  }

  get f() { return this.messageForm.controls; }

  onSubmit(post) {
    this.submitted = true;
    if (this.messageForm.valid) {
      this.accountService.sendMessage(this.messageForm.value).subscribe((res: any) => {
        if (res.status === 201) {
          this.toastr.successToastr('Message Sent.', 'Success!');
          this.dialogRef.close(true);
        } else {
          this.toastr.errorToastr('Error.', 'Error');
          this.dialogRef.close(false);

        }
      }, err => {
        this.toastr.errorToastr(err.error.error, 'Error');
        this.dialogRef.close(false);

      });
    }
    this.loading = true;
  }
}
