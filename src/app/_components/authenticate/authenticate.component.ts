import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})

export class AuthenticateComponent {
  username: string = '';
  password: string = '';

  constructor(protected authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.setTokens(res.access_token, res.refresh_token);
        this.router.navigate(['/surveys/list']);
      },
      error: (err) => {
        console.error('Login error', err);
        alert('Login failed. Please check your username and password.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
