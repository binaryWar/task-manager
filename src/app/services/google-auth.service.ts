import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private clientId: string = 'YOUR_CLIENT_ID';
  private redirectUri: string = 'http://localhost:3000/auth/google/callback';

  constructor(private router: Router, private http: HttpClient) {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin'
      });
    });
  }

  loginWithGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser: any) => {
      const id_token = googleUser.getAuthResponse().id_token;
      // Send the token to the backend
      this.http.post('http://localhost:3000/auth/google/callback', { token: id_token }).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.http.get('http://localhost:3000/auth/logout').subscribe(() => {
        this.router.navigate(['/']);
      });
    });
  }
}
