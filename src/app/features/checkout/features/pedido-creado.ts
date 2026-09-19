import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DatosTransferenciaService } from '../../../core/services/datosTransferencia.service';
import { PedidoResponseDTO } from '../../../core/models/pedido.model';
import { DatosTransferencia } from '../../../core/models/datosTransferencia';

@Component({
  selector: 'app-pedido-creado',
  imports: [CommonModule, RouterLink],
  templateUrl: './pedido-creado.html',
  styleUrl: './pedido-creado.css'
})
export class PedidoCreado implements OnInit {
  private router = inject(Router);
  private datosService = inject(DatosTransferenciaService);

  pedido: PedidoResponseDTO | null = null;
  datos: DatosTransferencia | null = null;

  ngOnInit(): void {
    // Leemos el pedido que nos pasó el checkout por el state de navegación.
    const state = history.state as { pedido?: PedidoResponseDTO };

    if (state?.pedido) {
      this.pedido = state.pedido;
    } else {
      this.router.navigate(['/']);
      return;
    }

    this.datosService.obtenerDatos().subscribe({
      next: (data) => {
        this.datos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  copiarCBU(): void {
    if (this.datos?.cbu) {
      navigator.clipboard.writeText(this.datos.cbu);
      alert('CBU copiado');
    }
  }
}
