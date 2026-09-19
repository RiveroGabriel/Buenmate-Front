import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Inicio: catálogo.
  { path: '', loadComponent: () => import('./features/catalogo/catalogo').then(m => m.Catalogo) },

  // Auth.
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  { path: 'registro', loadComponent: () => import('./features/auth/registro/registro').then(m => m.Registro) },

  // Checkout protegido.
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/checkout/checkout').then(m => m.Checkout)
  },
  {
  path: 'pedido-creado',
loadComponent: () => import('./features/checkout/features/pedido-creado').then(m => m.PedidoCreado)
  },
  // Admin protegido.
  {
    path: 'admin/pedidos',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/pedidos/pedidos').then(m => m.Pedidos)
  },

  // Ruta comodín.
  { path: '**', redirectTo: '', pathMatch: 'full' }
];