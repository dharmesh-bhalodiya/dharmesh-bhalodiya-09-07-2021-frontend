import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  isLoading: boolean = false;
  @Input() id;

  constructor(
    private accountService: AccountService,
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DeleteComponent>

  ) { }

  ngOnInit() {
  }

  deleteMessage() {
    this.isLoading = true;
    if (this.id) {
      this.accountService.deleteMsg(this.id).subscribe((res: any) => {
        if (res.status === 204) {
          this.toastr.successToastr('Message deleted successfully.', 'Success!');
          this.dialogRef.close(true);

        } else {
          this.toastr.errorToastr(res.message);
          this.dialogRef.close(false);

        }
        this.isLoading = false;
      }, err => {
        this.toastr.errorToastr(err.error.message);
        this.isLoading = false;
        this.dialogRef.close(false);
      });
    }
  }

}
