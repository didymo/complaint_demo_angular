import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = null;
  private csrfToken: string | null = null;
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
      tap((res: any) => {
        console.log('Login response:', res); // Log the entire response
        if (res.access_token && res.refresh_token) {
          this.setTokens(res.access_token, res.refresh_token);
        } else {
          console.error('Tokens not found in response');
        }
      }),
      switchMap(() => this.getCsrfToken()),
      catchError(this.handleError)
    );
  }

  private getCsrfToken(): Observable<string> {
    if (this.csrfToken) {
      return of(this.csrfToken);
    }
    const url = environment.csrfTokenUrl;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.get(url, { responseType: 'text', headers }).pipe(
      tap((token: string) => {
        this.csrfToken = token;
        localStorage.setItem('csrf_token', token);
        console.log('CSRF token set:', token);
      }),
      catchError(this.handleError)
    );
  }

  setTokens(accessToken: string, refreshToken: string): void {
    if (accessToken && refreshToken) {
      this.authToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      console.log('Tokens set:', { accessToken, refreshToken });
    } else {
      console.error('Invalid tokens provided:', { accessToken, refreshToken });
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
  /**
   * updating the erros
   */
  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(errorMessage);
  // }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getAuthTokenFromStorage(): string | null {
    return this.getToken();
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    if (this.csrfToken) {
      headers.append('X-CSRF-Token', this.csrfToken);
    }

    return headers;
  }

  getPOSTFileUploadHeaders(): HttpHeaders {
    const token = this.getToken();
    const csrfToken = this.getCsrfTokenFromStorage();
    if (!token || !csrfToken) {
      throw new Error('Authentication tokens are missing');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.api+json', // Make sure this matches the server's expected value
      'X-CSRF-Token': csrfToken
    });
  }
  /**
   * tryiong to sort the headers
   */
//   getPOSTFileUploadHeaders(): HttpHeaders {
//   const token = this.getToken();
//   const csrfToken = this.getCsrfTokenFromStorage();
//
//   if (!token || !csrfToken) {
//     throw new Error('Authentication tokens are missing');
//   }
//
//   let headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`,
//     'Accept': 'application/vnd.api+json',
//     'X-CSRF-Token': csrfToken
//   });
//
//   headers = headers.set('Content-Type', 'application/octet-stream');
//
//   return headers;
// }

  getCsrfTokenFromStorage(): string | null {
  if (!this.csrfToken) {
    this.csrfToken = localStorage.getItem('csrf_token');
  }
  return this.csrfToken;
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
