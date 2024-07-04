import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = null;
  public refreshToken: string | null = null;
  public isRefreshing = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    const url = environment.apiUrl;
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', environment.clientId);
    body.set('client_secret', environment.clientSecret);
    body.set('username', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(url, body.toString(), options).pipe(
      tap((res: any) => this.setTokens(res.access_token, res.refresh_token)),
      catchError(this.handleError)
    );
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.authToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getAuthTokenFromStorage(): string | null {
    return this.getToken();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  refreshTokenMethod(): Observable<any> {
    const url = environment.apiUrl;
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', environment.clientId);
    body.set('client_secret', environment.clientSecret);
    body.set('refresh_token', this.refreshToken || '');

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(url, body.toString(), options).pipe(
      tap((res: any) => this.setTokens(res.access_token, res.refresh_token)),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.authToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/user/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getTokenSubject(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }
}
