import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoRequest, PedidoResponseDTO } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly API_URL = 'http://localhost:8080/api/pedidos';
   private readonly ADMIN_URL = 'http://localhost:8080/api/admin/pedidos';

  constructor(private http: HttpClient) {}

  // Crea un pedido en el backend.
  crearPedido(pedido: PedidoRequest): Observable<PedidoResponseDTO> {
    return this.http.post<PedidoResponseDTO>(this.API_URL, pedido);
  }


  // Trae todos los pedidos. Si pasamos 'PENDIENTE', filtra.
  obtenerPedidos(estado?: string): Observable<PedidoResponseDTO[]> {
    const url = estado ? `${this.ADMIN_URL}?estado=${estado}` : this.ADMIN_URL;
    return this.http.get<PedidoResponseDTO[]>(url);
  }

  
  // Cambia el estado de un pedido.
  marcarComoPagado(id: number): Observable<PedidoResponseDTO> {
    return this.http.patch<PedidoResponseDTO>(`${this.ADMIN_URL}/${id}/estado?estadoPedido=PAGADO`, {});
  }


}