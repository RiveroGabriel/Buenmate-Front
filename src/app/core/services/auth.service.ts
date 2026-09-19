import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base donde están los endpoints de autenticación del backend.
  private readonly API_URL = 'http://localhost:8080/api/v1/auth';

  // Nombre con el que vamos a guardar el JWT en localStorage.
  private readonly TOKEN_KEY = 'token';

  // Inyectamos HttpClient para hacer peticiones HTTP y Router para navegar entre páginas.
  constructor(private http: HttpClient, private router: Router) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    // Observable → representa una respuesta que llega después.
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data).pipe(
      // tap() → ejecuta una acción cuando llega la respuesta.
      tap(response => this.saveToken(response.token))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    // Enviamos los datos de registro al backend mediante POST.
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data).pipe(
      // Cuando llega el token, lo guardamos en localStorage.
      tap(response => this.saveToken(response.token))
    );
  }

  logout(): void {
    // Eliminamos el JWT guardado y volvemos al login.
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    // Devuelve el JWT guardado o null si no existe.
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    // Si existe un token → true. Si no existe → false.
    return !!this.getToken();
  }

  private saveToken(token: string): void {
    // localStorage → guarda datos en el navegador.
    // Acá guardamos el JWT para poder utilizarlo en futuras peticiones.
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}