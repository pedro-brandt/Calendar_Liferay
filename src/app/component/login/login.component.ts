import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Login } from 'src/modules/models/login.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dadosLogin: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertModalService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  fazerLogin() {
    if (this.loginForm.invalid) return;
    var usuario = this.loginForm.getRawValue() as Login;
    this.authService.login(usuario).subscribe((response) => {
      if (!response.sucesso) {
        this.alertService.showAlertDanger('E-mail incorreto.');
      }
    })
  }
}



