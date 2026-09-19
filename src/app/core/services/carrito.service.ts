import { Injectable } from '@angular/core';
import { ItemCarrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';
import { PercentPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Clave para guardar el carrito en localStorage.
  private readonly CARRITO_KEY = 'carrito';

  // Trae los items del carrito guardados.
  obtenerCarrito(): ItemCarrito[] {
    const carrito = localStorage.getItem(this.CARRITO_KEY);
    return carrito ? JSON.parse(carrito) : [];
  }

  // Guarda el carrito en localStorage.
  private guardarCarrito(items: ItemCarrito[]): void {
    localStorage.setItem(this.CARRITO_KEY, JSON.stringify(items));
  }

  // Agrega un producto al carrito. Si ya existe, suma 1 a la cantidad.
  agregarProducto(producto: Producto): void{
    const carrito = this.obtenerCarrito();

    const itemExistente = carrito.find(item => item.productoId === producto.id)

    if(itemExistente) {
   // Si ya está, aumentamos la cantidad.
      itemExistente.cantidad++;
    } else {
    // si no esta, lo agregamos.
    carrito.push({
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1 
    });
    }
    this.guardarCarrito(carrito);
    
  }

  // Calcula el total del carrito.
  obtenerTotal(): number {
    return this.obtenerCarrito().reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  // Vacía el carrito.
  vaciarCarrito(): void {
    localStorage.removeItem(this.CARRITO_KEY);
  }

  // Cuenta la cantidad total de unidades en el carrito
  contarItems(): number {
    return this.obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
  }


}



