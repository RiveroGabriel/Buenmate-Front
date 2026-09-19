import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // URL del backend para productos.
  private readonly API_URL = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  // Trae todos los productos. El interceptor agrega el token automáticamente.
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);
  }
}