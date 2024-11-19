import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  isAdmin = false;
  expandedOrderId: number | null = null;

  constructor(
    private OrderService: OrderService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.AuthService.currentUser$.subscribe(user => {
      if (user) {
        this.isAdmin = user.role === 'ADMIN';
        if (this.isAdmin) {
          this.OrderService.getOrders().subscribe(orders => {
            this.orders = orders.sort((a, b) => b.id - a.id);
          });
        } else {
          this.OrderService.getUserOrders(user.id).subscribe(orders => {
            this.orders = orders.sort((a, b) => b.id - a.id);
          });
        }
      }
    });
  }

  updateStatus(orderId: number, status: 'PENDIENTE' | 'ENTREGADA' | 'CANCELADA'): void {
    this.OrderService.updateOrderStatus(orderId, status).subscribe();
  }

  toggleDetails(order: Order): void {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'PENDIENTE':
        return 'bg-warning';
      case 'ENTREGADA':
        return 'bg-success';
      case 'CANCELADA':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}