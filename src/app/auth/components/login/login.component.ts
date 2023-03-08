import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      isAdmin: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);

    this.loginService.login(this.loginForm.value);

    this.router.navigate(['/']);
  }
}
