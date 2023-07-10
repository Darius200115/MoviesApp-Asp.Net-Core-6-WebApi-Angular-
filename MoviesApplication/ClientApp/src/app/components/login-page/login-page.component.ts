import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginRequest } from 'src/app/shared/loginResult';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(private authService: AccountService, private router: Router) {}
  public creds: LoginRequest = {
    email: '',
    password: '',
  };
  public ErrorMessage = '';

  public onSubmit() {
    this.authService.login(this.creds).subscribe(
      (result) => {
        console.log('Login successful');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
        this.ErrorMessage = 'Invalid email or password';
      }
    );
  }
}
