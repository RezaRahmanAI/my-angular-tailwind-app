import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  loginModel = { email: '', password: '' };
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    this.animateForm();
  }

  animateForm() {
    gsap.fromTo(
      '[data-animate="login-form"]',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }

  animateError() {
    gsap.fromTo(
      '[data-animate="error-message"]',
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login(this.loginModel.email, this.loginModel.password)
      .subscribe({
        next: (res) => {
          // token & user data saved internally by AuthService.login()
          this.router.navigate(['dashboard']);
          console.log('Login successful:', res);
        },
        error: (err) => {
          this.errorMessage =
            err.status === 401
              ? 'Invalid email or password'
              : 'An error occurred. Please try again.';
          this.animateError();
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
