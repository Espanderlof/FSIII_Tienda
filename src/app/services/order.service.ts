import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order, OrderItem } from '../models/order';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  constructor() {
    // Cargar órdenes del localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
      this.ordersSubject.next(this.orders);
    }
  }

  createOrder(): Observable<Order> {
    const currentUser = this.authService.currentUserValue;
    const cart = this.cartService.currentCartValue;

    if (!currentUser || !cart) {
      throw new Error('No hay usuario o carrito');
    }

    const newOrder: Order = {
      id: this.orders.length + 1,
      userId: currentUser.id,
      userName: `${currentUser.nombre} ${currentUser.apellido}`,
      items: cart.items.map((item: { product: any; quantity: number; subtotal: number; }) => ({
        productId: item.product.id,
        productName: item.product.nombre,
        quantity: item.quantity,
        price: item.product.precio,
        subtotal: item.subtotal
      })),
      total: cart.total,
      status: 'PENDIENTE',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.push(newOrder);
    this.saveOrders();
    this.cartService.clearCart();

    return of(newOrder);
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return of(this.orders.filter(order => order.userId === userId));
  }

  updateOrderStatus(orderId: number, status: 'PENDIENTE' | 'ENTREGADA' | 'CANCELADA'): Observable<Order> {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        status,
        updatedAt: new Date()
      };
      this.saveOrders();
      return of(this.orders[orderIndex]);
    }
    throw new Error('Orden no encontrada');
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.ordersSubject.next(this.orders);
  }
}