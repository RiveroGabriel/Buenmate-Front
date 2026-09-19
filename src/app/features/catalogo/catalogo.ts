import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../app/core/services/productoService';
import { CarritoService } from '../../../app/core/services/carrito.service';
import { Producto, Categoria } from '../../../app/core/models/producto.model';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  productos: Producto[] = [];
  cargando: boolean = true;
  error: string = '';

  // Filtros del catálogo.
  busqueda: string = '';
  categoriaSeleccionada: number | null = null;

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  // Categorías únicas sacadas de los productos cargados.
  get categorias(): Categoria[] {
    const mapa = new Map<number, Categoria>();
    this.productos.forEach(p => {
      if (p.categoria) {
        mapa.set(p.categoria.id, p.categoria);
      }
    });
    return Array.from(mapa.values());
  }

  // Productos filtrados por categoría y por texto de búsqueda.
  get productosFiltrados(): Producto[] {
    return this.productos.filter(p => {
      const coincideCategoria = this.categoriaSeleccionada === null || p.categoria?.id === this.categoriaSeleccionada;
      const texto = this.busqueda.toLowerCase().trim();
      const coincideBusqueda = texto === '' || p.nombre.toLowerCase().includes(texto);
      return coincideCategoria && coincideBusqueda;
    });
  }

  seleccionarCategoria(id: number | null): void {
    this.categoriaSeleccionada = id;
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
    alert(`${producto.nombre} agregado al carrito`);
  }
}
