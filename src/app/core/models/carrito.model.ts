import { Producto } from './producto.model';

// Item que guardamos en el carrito.
export interface ItemCarrito {
  productoId: number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
}