import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../../app/core/services/carrito.service';
import { ItemCarrito } from '../../../app/core/models/carrito.model';
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoRequest } from '../../../app/core/models/pedido.model';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  private carritoService = inject(CarritoService);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);

  items: ItemCarrito[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.items = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.obtenerTotal();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.items = [];
    this.total = 0;
  }

  crearPedido(): void {
    const pedido: PedidoRequest = {
      items: this.items.map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidad
      }))
    };

    this.pedidoService.crearPedido(pedido).subscribe({
      next: (respuesta) => {
        this.carritoService.vaciarCarrito();
        // Redirigimos pasando el pedido creado a la pantalla de confirmación.
        this.router.navigate(['/pedido-creado'], { state: { pedido: respuesta } });
      },
      error: (err) => {
        alert('Error al crear el pedido');
        console.error(err);
      }
    });
  }
}
