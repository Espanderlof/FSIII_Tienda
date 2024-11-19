import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}
  products: Product[] = [
    {
      id: 1,
      activo: 1,
      categoria: 'Procesadores',
      descripcion: 'Procesador AMD Ryzen 9 7950X, 16 núcleos, 32 hilos, velocidad base 4.5GHz, velocidad máxima 5.7GHz, caché L3 64MB',
      fechaCreacion: new Date(),
      imagenUrl: 'https://via.placeholder.com/300x200',
      nombre: 'AMD Ryzen 9 7950X',
      precio: 450000,
      stock: 15,
      ultimaActualizacion: new Date()
    },
    {
      id: 2,
      activo: 1,
      categoria: 'Tarjetas Gráficas',
      descripcion: 'NVIDIA GeForce RTX 4080 16GB GDDR6X, Ray Tracing en tiempo real, DLSS 3.0, ideal para gaming 4K',
      fechaCreacion: new Date(),
      imagenUrl: 'https://via.placeholder.com/300x200',
      nombre: 'NVIDIA RTX 4080',
      precio: 900000,
      stock: 8,
      ultimaActualizacion: new Date()
    },
    {
      id: 3,
      activo: 1,
      categoria: 'Monitores',
      descripcion: 'Monitor Gaming ASUS ROG Swift 27", 2K QHD (2560x1440), 240Hz, 1ms, G-SYNC, HDR 600',
      fechaCreacion: new Date(),
      imagenUrl: 'https://via.placeholder.com/300x200',
      nombre: 'ASUS ROG Swift PG27AQN',
      precio: 350000,
      stock: 12,
      ultimaActualizacion: new Date()
    },
    {
      id: 4,
      activo: 1,
      categoria: 'Almacenamiento',
      descripcion: 'SSD NVMe Samsung 990 PRO 2TB, PCIe 4.0, velocidades de lectura/escritura de hasta 7450/6900 MB/s',
      fechaCreacion: new Date(),
      imagenUrl: 'https://via.placeholder.com/300x200',
      nombre: 'Samsung 990 PRO 2TB',
      precio: 219990,
      stock: 20,
      ultimaActualizacion: new Date()
    },
    {
      id: 5,
      activo: 1,
      categoria: 'Memoria RAM',
      descripcion: 'Kit Memoria RAM G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6000MHz CL30, Perfect para AMD Ryzen 7000',
      fechaCreacion: new Date(),
      imagenUrl: 'https://via.placeholder.com/300x200',
      nombre: 'G.Skill Trident Z5 RGB 32GB',
      precio: 189990,
      stock: 25,
      ultimaActualizacion: new Date()
    }
  ];

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // Método para verificar si el usuario es cliente
  isClient(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user?.role === 'CLIENTE')
    );
  }

}