// Item individual del pedido que enviamos al backend.
export interface ItemPedidoRequest {
  productoId: number;
  cantidad: number;
}

// Pedido completo que enviamos al backend.
export interface PedidoRequest {
  items: ItemPedidoRequest[];
}

// Respuesta del backend al crear el pedido.
export interface PedidoResponseDTO {
  id: number;
  fecha: string;
  estado: string;
  total: number;
  usuarioNombre: string;
  usuarioEmail: string;
  items: any[]; // Después podemos tiparlo mejor.
}

// Respuesta de un item dentro del pedido.
export interface ItemPedidoResponseDTO {
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
