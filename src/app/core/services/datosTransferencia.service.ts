import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosTransferencia } from '../models/datosTransferencia';

@Injectable({
  providedIn: 'root'
})
export class DatosTransferenciaService {
  private readonly API_URL = 'http://localhost:8080/api/datos-transferencia';

  constructor(private http: HttpClient) {}

  // Trae los datos de transferencia (CBU, alias, titular).
  obtenerDatos(): Observable<DatosTransferencia> {
    return this.http.get<DatosTransferencia>(this.API_URL);
  }
}