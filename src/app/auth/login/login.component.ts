import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, Routes } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { 
        validators: [Validators.required]
      }),
    });
  }
  get emailIsInvalid() {
    return (
    this.loginForm.controls['email'].invalid &&
    this.loginForm.controls['email'].dirty &&
    this.loginForm.controls['email'].touched
  )
}
  get passwordIsInvalid() {
    return (
    this.loginForm.controls['password'].invalid &&
    this.loginForm.controls['password'].dirty && 
    this.loginForm.controls['password'].touched
  )
}

  togglePassword(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if(this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: () => {
        console.log("invalid email/password")
      }
    })
  }
}
