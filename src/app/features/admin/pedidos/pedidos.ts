import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../core/services/pedido.service';
import { PedidoResponseDTO } from '../../../core/models/pedido.model';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {
  private pedidoService = inject(PedidoService);

  pedidos: PedidoResponseDTO[] = [];
  cargando: boolean = true;
  busqueda: string = '';

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        console.error(err);
      }
    });
  }

  // Pedidos filtrados por nombre o email del cliente.
  get pedidosFiltrados(): PedidoResponseDTO[] {
    const texto = this.busqueda.toLowerCase().trim();
    if (texto === '') {
      return this.pedidos;
    }
    return this.pedidos.filter(p =>
      p.usuarioNombre?.toLowerCase().includes(texto) ||
      p.usuarioEmail?.toLowerCase().includes(texto)
    );
  }

  // Estadísticas calculadas desde los pedidos.
  get totalPedidos(): number {
    return this.pedidos.length;
  }

  get pendientes(): number {
    return this.pedidos.filter(p => p.estado === 'PENDIENTE').length;
  }

  get pagados(): number {
    return this.pedidos.filter(p => p.estado === 'PAGADO').length;
  }

  get ingresos(): number {
    return this.pedidos
      .filter(p => p.estado === 'PAGADO')
      .reduce((suma, p) => suma + Number(p.total), 0);
  }

  marcarPagado(id: number): void {
    this.pedidoService.marcarComoPagado(id).subscribe({
      next: () => {
        this.cargarPedidos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
