import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent {
  constructor(private authService: AccountService, private router: Router) {}

  public user: User = new User();
  errorMessage: string;
  onSubmit() {
    this.authService.registration(this.user).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
