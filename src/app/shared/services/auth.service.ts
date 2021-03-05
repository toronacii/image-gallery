import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, API_URL } from 'src/environments/environment';
import { TokenService } from './token.service';
import { map } from 'rxjs/operators';

interface AuthResponse {
  auth: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {}

  auth() {
    return this.http
      .post<AuthResponse>(API_URL + '/auth', { apiKey: API_KEY })
      .pipe(map(({ token }) => this.tokenService.set(token)));
  }

  isAuth() {
    return this.tokenService.exists();
  }
}
