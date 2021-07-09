import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      // password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl']s || '/';
  }

  getError(el) {
    switch (el) {
      case 'user':
        if (this.loginForm.get('username').hasError('required')) {
          return 'Please Enter Username';
        }
        break;
      default:
        return '';
    }
  }


  get f() { return this.loginForm.controls; }


  onSubmit(post) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value);

  }
}
